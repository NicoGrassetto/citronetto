const { SlashCommandBuilder } = require('discord.js');
const { TODOList } = require('../../templates/listTemplate.js');
const { Database } = require('../../database.js');
const { tasksToString } = require('../../utils.js');
const database = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.addStringOption(option => option.setName('list').setDescription('pick up trash; walk out the dog; squeeze fresh lemons'))
		.setDescription('Create a todo list.'),
	async execute(interaction) {
		const tag = interaction.user.id;
		const list = new TODOList(interaction.options.getString('list').split(';'));
		try {
			database.addTODOList(tag, JSON.stringify(list));
			// await interaction.reply(`${}`);
			console.log(list.getDescriptions());
			console.log(list.getStatuses());
			console.log(list.getTaskStatusesAsBoolean());
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				await interaction.reply('You already have an active todo list');
			}
			else {
				await interaction.reply('An error occurred while creating your todo list');
				console.error(error);
			}
		}
	},
};

