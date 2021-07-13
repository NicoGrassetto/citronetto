const Discord = require('discord.js');

module.exports = {
	name: 'time',
	description: 'Something',
	execute(message) {
        const pomoCheck = new Discord.MessageEmbed()
        .setAuthor('🍅 LemonSaltStudio', 'https://i.imgur.com/cLjbtlk.gif')
        .setColor('#e71c18')
        .setDescription('`Time remaining before next break:` **' + 12 + '** `minutes and` **' + 15 + '** `seconds.`')
        .setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif')
        .setThumbnail('https://i.imgur.com/fjfaLkl.png');
        
        message.channel.send(pomoCheck);
    },
};