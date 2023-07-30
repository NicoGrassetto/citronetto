const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('done')
		.setDescription('Set a task as done.'),
	async execute(interaction) {
		await interaction.reply('Done');
	},
};