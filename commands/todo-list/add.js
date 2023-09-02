const { SlashCommandBuilder } = require('discord.js');
const { createFailureEmbed, createTODOListEmbed } = require('../../utils.js');
const { Database } = require('../../database.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.addStringOption(option => option.setName('task').setDescription('Squeeze fresh lemons'))
		.setDescription('Add a new task to your todo list.'),
	async execute(interaction) {
		if (interaction.channel.id !== '1142781570126712892') {
			await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'TODO lists are only available in the todo list channel.')] });
		}
		else {
			const tag = interaction.user.id;
			const isAlreadyInDB = await database.alreadyInDB(tag);
			if (isAlreadyInDB) {
				try {
					const description = interaction.options.getString('task');
					await database.addTaskToTODOList(tag, description);
					const list = await database.getTODOList(tag);
					await interaction.reply({ embeds: [createTODOListEmbed(interaction, list)] });
				}
				catch (error) {
					await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'An error occurred while displaying your TODO list.')] });
					console.log(error);
				}
			}
			else {
				await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'You have no active TODO list!')] });
			}
		}
	},
};