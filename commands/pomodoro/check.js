const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Check how long until your next break or next work session!'),
	async execute(interaction) {
		await interaction.reply('Check activated!');
	},
};