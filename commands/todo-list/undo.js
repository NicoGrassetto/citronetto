const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('undo')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of your task in the list (e.g. 3).'))
		.setDescription('Set a task to todo'),
	async execute(interaction) {
		await interaction.reply('Task successfully undone (set to todo)!');
	},
};