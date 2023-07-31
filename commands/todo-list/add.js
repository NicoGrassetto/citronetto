const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.addStringOption(option => option.setName('tasks').setDescription('pick up trash, walk out the dog, squeeze fresh lemons or simply one task'))
		.setDescription('Add a new task to your todo list.'),
	async execute(interaction) {
		await interaction.reply('Task added');
	},
};