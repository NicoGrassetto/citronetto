const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('opt')
		.setDescription('Opt in or out of a pomodoro session.')
		.addStringOption(option => option.setName('in').setDescription('Choose in to opt in and out to opt out.')),
	async execute(interaction) {
		await interaction.reply('Stopping!');
	},
};