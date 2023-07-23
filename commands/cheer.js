const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cheer')
        .setDescription('Give us a bit of motivation.')
        .addStringOption(option => option.setName('cheer').setDescription('Your message')),
	async execute(interaction) {
        //if (interaction.channel.id === '828177714993299466') {
            const cheerEmbed = new MessageEmbed()
                .setColor("FFFB00")
                .setTitle("Thank you " + interaction.user.username + " for the message!")
                .addField(interaction.user.username + "' message:" ,interaction.options.getString('cheer'))
                .setAuthor("Citronetto")
                .setThumbnail('https://i.imgur.com/0qQYgbX.png')
                .setFooter("LemonSaltStudio©","https://i.imgur.com/cLjbtlk.gif")
                .setTimestamp();
            await interaction.channel.send({ embeds: [cheerEmbed] });
            await interaction.reply({ content:'Command successfully sent! 👍\nThank you so much for cheering us up! You rock! 🥺', ephemeral:true });
	
        //}
    },
};