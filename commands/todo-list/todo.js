const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');
const { Database } = require('../../database.js');
const { createTODOListEmbed, TODOListCreatedSuccessEmbed, createFailureEmbed } = require('../../utils.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.addStringOption(option => option.setName('list').setDescription('pick up trash; walk out the dog; squeeze fresh lemons'))
		.setDescription('Create a todo list.'),
	async execute(interaction) {
		if (interaction.channel.id !== '1142781570126712892') {
			await interaction.reply({ ephemeral: true, content: 'TODO lists are only available in the todo list channel.' });
		}
		else {
			const tag = interaction.user.id;
			const list = new TODOList(interaction.options.getString('list').split(';'));

			const isAlreadyInDB = await database.alreadyInDB(tag);
			if (isAlreadyInDB) {
				await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'You already have an active TODO list!')] });
			}
			else {
				try {
					database.addTODOList(tag, JSON.stringify(list));
					interaction.channel.send({ embeds: [createTODOListEmbed(interaction, list)] });
					await interaction.reply({ ephemeral: true, embeds: [TODOListCreatedSuccessEmbed] });
				}
				catch (error) {
					await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'An error occurred while deleting your TODO list.')] });
					console.log(error);
				}
			}
		}
	},
};

