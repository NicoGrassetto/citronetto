const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('display')
		.setDescription('Display your todo list.'),
	async execute(interaction) {
		await interaction.reply('Todo list displayed!');
	},
};