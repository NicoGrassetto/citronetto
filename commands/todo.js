const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const utils = require('../utils.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
        .setDescription('Create a todo list!')
        .addStringOption(option => option.setName('tasks').setDescription('Pass in some tasks')),
	async execute(interaction) {
        if (interaction.channel.id === '814074843653079050') {
            console.log("Message sent in todo.");
            await interaction.channel.send({ content: "Soon a really cute embed message" });

        }
    },
};