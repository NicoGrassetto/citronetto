const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Transfer the current pomodoro session to someone else.')
		.addStringOption(option => option.setName('tag').setDescription('The tag of the member you want to transfer the pomodoro session to.')),
	async execute(interaction) {
		await interaction.reply('Transfer...');
	},
};