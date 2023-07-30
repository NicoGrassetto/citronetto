const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modify')
		.setDescription('Modify a task in your todo list.'),
	async execute(interaction) {
		await interaction.reply('modified');
	},
};