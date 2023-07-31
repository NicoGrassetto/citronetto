const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('done')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of the task you want to set to done.'))
		.setDescription('Set a task as done.'),
	async execute(interaction) {
		await interaction.reply('Task set to done');
	},
};