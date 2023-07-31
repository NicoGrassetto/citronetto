const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of the task you want to delete (e.g. 4).'))
		.setDescription('Delete a task from your todo list.'),
	async execute(interaction) {
		await interaction.reply('Task deleted');
	},
};