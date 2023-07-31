const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modify')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of the task you want to modify (e.g. 4).'))
		.addStringOption(option => option.setName('replacement-task').setDescription('The task you want to replace it with.'))
		.setDescription('Modify a task in your todo list.'),
	async execute(interaction) {
		await interaction.reply('Task successfully modified!');
	},
};