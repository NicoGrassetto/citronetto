const {MessageEmbed} = require('discord.js');
const userController = require('../userController.js');
module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
        // Send the message to a designated channel on a server:
        const channel = member.guild.channels.cache.find(ch => ch.id === '803911614038278165');
        // Do nothing if the channel wasn't found on this server
        console.log("Someone joined");
        if (!channel) console.log("Channel not found on this server");
        // Send the message, mentioning the member
        userController.addUser(member.id);
        const welcomeEmbed = new MessageEmbed()
        .setColor('#f0b6f2')
        .setTitle("Welcome Message👋")
        .addField("🍰We have a new cutie pie!", "🌺We bid you welcome " + member.user.username + "! 😊");
        channel.send({ embeds: [welcomeEmbed] }).then(message =>{
            message.react("👋");
            let role = member.guild.roles.cache.find(role => role.id === "762268555361386516");
            member.roles.add(role);
        });
    },
};

