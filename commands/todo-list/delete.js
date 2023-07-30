const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete a task from your todo list.'),
	async execute(interaction) {
		await interaction.reply('deleted');
	},
};