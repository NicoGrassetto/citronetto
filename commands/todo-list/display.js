const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('display')
		.setDescription('Display your todo list.'),
	async execute(interaction) {
		await interaction.reply('Todo list displayed!');
	},
};