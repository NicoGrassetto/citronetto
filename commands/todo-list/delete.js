const { SlashCommandBuilder } = require('discord.js');
const { createFailureEmbed, createTODOListEmbed, createSuccessEmbed, createFinishedTODOListEmbed } = require('../../utils.js');
const { Database } = require('../../database.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of the task you want to delete (e.g. 4).'))
		.setDescription('Delete a task from your todo list.'),
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
						const list = await database.getTODOList(tag);
						await database.deleteTaskFromTODOList(tag, index);
						const listAfterDeletion = await database.getTODOList(tag);
						if (list.descriptions.length === 1) {
							await interaction.reply({ ephemeral: true, embeds: [createSuccessEmbed(interaction, 'It was your last task! Your TODO list has been deleted.')] });
							await interaction.reply({ embeds: [createFinishedTODOListEmbed(interaction)] });
						}
						else if (!listAfterDeletion.statuses.find(status => status === false)) {
							await interaction.reply({ ephemeral: true, embeds: [createSuccessEmbed(interaction, 'It was your last task! Your TODO list has been deleted.')] });
							await database.resetTODOList(tag);
						}
						else {
							const listToDisplay = await database.getTODOList(tag);
							await interaction.reply({ embeds: [createTODOListEmbed(interaction, listToDisplay)] });
						}
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