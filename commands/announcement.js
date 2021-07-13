const Discord = require('discord.js');

module.exports = {
	name: 'announcement',
	description: 'Something',
	execute(message) {
        if((message.author.id === '421060045866795028' || message.author.id === '117604414646255618') && message.content.startsWith('.announcement')){
            let parameters = message.content.substring(13).split('|');
            //.announcement <field title>|<field content>|<image link>
            let announcementEmbed = new Discord.MessageEmbed()
            .setColor('#f9536b')
            .setAuthor('📝 LemonSaltStudio', 'https://i.imgur.com/cLjbtlk.gif')
            .setDescription('Hey everyone! Sorry for the notification but we have something important to tell you. 😌')
            .setThumbnail('https://i.imgur.com/ljFBy4p.png')
            .addField(parameters[0], parameters[1])  
            .setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif');
            console.log(parameters[0] + "    " + parameters[1]);
            if(parameters.length === 3) {
              announcementEmbed.setImage(parameters[2]);
            }
            message.delete();
            message.channel.send(announcementEmbed);
          }    
    },
};
