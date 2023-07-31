const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.addStringOption(option => option.setName('list').setDescription('pick up trash, walk out the dog, squeeze fresh lemons'))
		.setDescription('Create a todo list.'),
	async execute(interaction) {
		await interaction.reply('Todo list created!');
	},
};

