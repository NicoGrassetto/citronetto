const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the current pomodoro session.'),
	async execute(interaction) {
		await interaction.reply('Stopping!');
	},
};