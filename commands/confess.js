const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
        .setDescription('Confess anonymously something. No one will see your name!')
        .addStringOption(option => option.setName('confession').setDescription('Your confession')),
	async execute(interaction) {
        if (interaction.channel.id === '828177714993299466') {
            const confessionEmbed = new MessageEmbed()
            .setColor('#f0b6f2')
            .setTitle("🌹Confession System🔒")
            .addField("🌸A new confession just arrived!🤫", interaction.options.getString('confession'));
            await interaction.channel.send({ embeds: [confessionEmbed] });
            await interaction.reply({ content:'Confession successfully sent! 👍', ephemeral:true });
	
        }
    },
};