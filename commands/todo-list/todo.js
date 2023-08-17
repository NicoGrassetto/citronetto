const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');
const { Database } = require('../../database.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.addStringOption(option => option.setName('list').setDescription('pick up trash, walk out the dog, squeeze fresh lemons'))
		.setDescription('Create a todo list.'),
	async execute(interaction) {
		await interaction.reply('Todo list created!');
		const tag = interaction.user.id;
		const list = new TODOList(interaction.options.getString('list').split(','));
		console.log(list);
		console.log(tag);
		try {
			database.addTODOList(tag, JSON.stringify(list));
		}
		catch (error) {
			await interaction.reply('You already have an active todo list');
		}
	},
};

