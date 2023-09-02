const { SlashCommandBuilder } = require('discord.js');
const { createFailureEmbed, createTODOListEmbed } = require('../../utils.js');
const { Database } = require('../../database.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('undo')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of your task in the list (e.g. 3).'))
		.setDescription('Set a task to todo'),
	async execute(interaction) {
		if (interaction.channel.id !== '1142781570126712892') {
			await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'TODO lists are only available in the todo list channel.')] });
		}
		else {
			const tag = interaction.user.id;
			const isAlreadyInDB = await database.alreadyInDB(tag);
			if (isAlreadyInDB) {
				try {
					const index = interaction.options.getInteger('task-number') - 1;
					const listLength = await database.getTODOList(tag);
					if (index >= listLength.descriptions.length || index < 0) {
						await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'The task number is not valid!')] });
					}
					else {
						await database.undoTask(tag, index);
						const list = await database.getTODOList(tag);
						await interaction.reply({ embeds: [createTODOListEmbed(interaction, list)] });
					}
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