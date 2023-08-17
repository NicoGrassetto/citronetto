const { SlashCommandBuilder } = require('discord.js');
const { Database } = require('../../database.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.addIntegerOption(option => option.setName('task-number').setDescription('The number of the task you want to delete (e.g. 4).'))
		.setDescription('Delete a task from your todo list.'),
	async execute(interaction) {
		await interaction.reply('Task deleted');
		const tag = interaction.user.id;
		const number = interaction.options.getInteger('task-number');
		// console.log(tag);
		// console.log(number);
		database.deleteTaskFromTODOList('972158965913882675', 1);
	},
};