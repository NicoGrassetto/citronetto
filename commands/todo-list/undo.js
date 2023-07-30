const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('undo')
		.setDescription('Undo a task.'),
	async execute(interaction) {
		await interaction.reply('undone');
	},
};