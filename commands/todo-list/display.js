const { SlashCommandBuilder } = require('discord.js');
const { Database } = require('../../database.js');
// const { TODOList } = require('../../templates/listTemplate.js');
const { createFailureEmbed, createTODOListEmbed } = require('../../utils.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('display')
		.setDescription('Display your todo list.'),
	async execute(interaction) {
		if (interaction.channel.id !== '1142781570126712892') {
			await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'TODO lists are only available in the todo list channel.')] });
		}
		else {
			const tag = interaction.user.id;

			const isAlreadyInDB = await database.alreadyInDB(tag);
			if (isAlreadyInDB) {
				try {
					const list = await database.getTODOList(tag);
					interaction.reply({ embeds: [createTODOListEmbed(interaction, list)] });
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