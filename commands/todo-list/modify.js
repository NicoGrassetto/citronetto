const { SlashCommandBuilder } = require('discord.js');
const { createFailureEmbed, createTODOListEmbed } = require('../../utils.js');
const { Database } = require('../../database.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modify')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of the task you want to modify (e.g. 4).'))
		.addStringOption(option => option.setName('replacement-task').setDescription('The task you want to replace it with.'))
		.setDescription('Modify a task in your todo list.'),

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
					const description = interaction.options.getString('replacement-task');
					const listLength = await database.getTODOList(tag);
					if (index >= listLength.descriptions.length || index < 0) {
						await interaction.reply({ ephemeral: true, embeds: [createFailureEmbed(interaction, 'The task number is not valid!')] });
					}
					else {
						await database.modifyTaskDescriptionFromTODOList(tag, index, description);
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