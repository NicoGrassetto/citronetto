const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add a new task to your todo list.'),
	async execute(interaction) {
		await interaction.reply('added');
	},
};