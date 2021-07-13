const Discord = require('discord.js');
//let studyInterval = 1000*60*25;// Converted to seconds and default value is 25 min
//let breakInterval = 1000*60*5;// Converted to seconds and default value is 5 min

//let timeElapsed = 0;
//let minutesElapsed = 0;
const millisecondsInASecond = 1000;
let pomoDuration = 25;// In minutes
let breakDuration = 5;// In minutes
let numberOfSessions = 4;
const pomoBreak = new Discord.MessageEmbed()
.setAuthor('🍅 LemonSaltStudio', 'https://i.imgur.com/cLjbtlk.gif')
.setColor('#e71c18')
.setDescription()
.setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif')
//.setImage()
.setThumbnail('https://i.imgur.com/fjfaLkl.png')
//.setTimestamp()
.setTitle()
//.setURL();
let currentTime = new Date().getSeconds();  
const pomoStart = new Discord.MessageEmbed()
.setAuthor('🍅 LemonSaltStudio', 'https://i.imgur.com/cLjbtlk.gif')
.setColor('#e71c18')
.setDescription('Your pomo session just started!')
.setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif')
.setImage('https://i.imgur.com/28OghKt.gif')
.setThumbnail('https://i.imgur.com/fjfaLkl.png');

module.exports = {
	name: 'start',
	description: 'Something',
	execute(message) {
    //.start <pomo duration: a number> <break duration: a number> <number of sessions: an integer>
    const args = message.content.substring(7).split(' ');
    if(args[0] != ''){// If we have an argument for pomoDuration
      pomoDuration = args[0];
    }
    if(args[1] != ''){// If we have an argument for breakDuration
      breakDuration =  args[1];
    }
    if(args[2] != ''){// If we have an argument for numberOfSessions
      numberOfSessions = args[2];
    }
    if(((args.length < 3) && (args.length !== 0)) || (args.length > 3)){
      // return some kind of error.
    }
    
    // We start we a pomo session before entering the loop since this one is fired right after the command is done.
    console.log('Pomodoro Session started by: ' + message.author.username + '\n Study Interval: ' + pomoDuration + '\n Break Interval:' + breakDuration + '\n Number of Sessions: ' + numberOfSessions);
    message.channel.send(pomoStart);
    let seconds = 1;
    const timer = setInterval(function(){
      console.log(seconds);
      seconds++;
      if(seconds % minutestoSeconds(pomoDuration) === 0){// it is a multiple of 25
        message.channel.send(pomoBreak)
      }else if(seconds % (minutestoSeconds(pomoDuration)+ minutestoSeconds(breakDuration)) === 0){
        message.channel.send(pomoStart);
      }
    }, millisecondsInASecond);
    
  },
};

function minutestoSeconds(minutes){
  return minutes*60;
}