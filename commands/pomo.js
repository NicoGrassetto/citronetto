const { SlashCommandBuilder } = require('@discordjs/builders');
const { clear } = require('console');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

let studyTime = 25; 
let breakTime = 5; 
let sessionNumber = 4; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pomodoro')
        .setDescription('Start a custom pomodoro session!')
        .addStringOption(option => option.setName('studytime').setDescription('Your study time (25 minutes by default)')),
	async execute(interaction) {
       if (interaction.channel.parent.name.includes('study room')) {
        interactionChannel = interaction.channel;
        const startEmbed = new Discord.MessageEmbed()
            .setAuthor('🍅 LemonSaltStudio')//https://i.imgur.com/cLjbtlk.gif
            .setColor('#e71c18')
            .setDescription('Your pomo session just started!')
            .setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif')
            .setImage('https://i.imgur.com/28OghKt.gif')
            .setThumbnail('https://i.imgur.com/fjfaLkl.png');
            await interaction.channel.send({embeds: [startEmbed]});
            
            //Keep track manually of the first session
            // Pomo session 1 just started.
            let sessionCounter = 1;
            setTimeout(() => {
                const startEmbed = new Discord.MessageEmbed()
                .setAuthor('🍅 LemonSaltStudio')//https://i.imgur.com/cLjbtlk.gif
                .setColor('#e71c18')
                .setDescription('Your pomo session just started!')
                .setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif')
                .setImage('https://i.imgur.com/nh9GedB.gif')
                .setThumbnail('https://i.imgur.com/fjfaLkl.png');
                console.log("Time for a break");
                interactionChannel.send("Break time.")
            }, minutesToMilliseconds(studyTime));

            const sessionInterval = setInterval(() => { // This happens every 30 minutes. -> New session starts 
                if (sessionCounter < sessionNumber) {
                    sessionCounter++;
                    console.log("Get back to work");
                    setTimeout(() => {
                        console.log("Break");
                        interactionChannel.send("Break time.")
                    }, minutesToMilliseconds(studyTime));
                } else {
                    clearInterval(sessionInterval);
                }
            }, minutesToMilliseconds(studyTime + breakTime))
            await interaction.channel.send("Pomo sessions completed!");
            await interaction.reply({ content:'Pomodoro session successfully started! 👍', ephemeral:true });
	
       }
    },
};
function minutesToMilliseconds(minutes) {
    const secondsInMinute = 60;
    const millisecondsInSecond = 1000;
    return minutes * secondsInMinute * millisecondsInSecond;
}
