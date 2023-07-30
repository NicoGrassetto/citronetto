const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('Create a todo list.'),
	async execute(interaction) {
		await interaction.reply('created');
	},
};