'use strict';
const { throws } = require('assert');
const { timeStamp } = require('console');
const {token, prefix} = require('./config.json');



// Extract the required classes from the discord.js module
const {Client, MessageEmbeds} = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); 

const { isFunction } = require('util');
const d = new Date();
client.login(token);
client.commands = new Discord.Collection();


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  console.log(file);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
let count = 0;
let currentTodoLists = null; //TODO replace it with todos in due course
let channelsDB = null;
let emojis = [];
fs.readFile('emojis.json', 'utf8', function(err, data) {
  if (err) throw err;
  //console.log(data);
  emojis = JSON.parse(data)["emojis"];
});
fs.readFile('channelsDB.json', 'utf8', function(err, data) {
  if (err) throw err;
  //console.log(data);
  channelsDB = JSON.parse(data);
});
/**
 * 
 * @param {VoiceState} state the voice state
 */
function channelIsEmpty(state){
  if(state.channel.members.size === 0){
    console.log(`${state.channel.name} is now empty.`);
    return true;
  }else {
    return false;
  }
}

function wasASwitch(oldState, newState) {
  if(newState.channel !== oldState.channel || oldState.channel === null) {
    return true;
  }
  return false;
}


const commands = ["timer", "send", "poll", "sorry", "brent", "what", "author", "butt", "here","lemons","time", "todo", "confessionWhat", "rose", "rules", "friday"];


client.on('message', message => {
  console.log("▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁");
  console.log("[👤] Username: " + message.author.username);
  console.log("[⏰] Time: " + message.author.createdAt);
  console.log("[💳] Author's ID: " + message.author.id);
  console.log("[] Message's content: " + message.content);
  console.log("﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍");
  console.log("[🗂] Channel name: " + message.channel.name);
  console.log("[🗂] Channel's ID: " + message.channel.id);
  console.log("▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁");
  //Add a feature for limited roles where people can exchange them
  if(isACommand(message.content)){
    switch (message.content.substring(1)) {
      case commands[0]:
        message.channel.send("https://www.youtube.com/watch?v=cPtXhWnqzAc");
        break;
        case commands[1]:
          const shopGifEmbed = new Discord.MessageEmbed()
          .setColor('#72228b')
          .setAuthor('🛒 Lemon Shop™ (COMING SOON)', 'https://i.imgur.com/cLjbtlk.gif')
          .setDescription('Buy amazing perks using your lemons. Get the most out of your experience on the server and flex like never before!')
          .setThumbnail('https://i.imgur.com/RWME5rd.gif')
          .setImage('https://cdn.discordapp.com/attachments/812014361752895529/851032649899180082/image0.gif')
          .addFields(
              { name: '🎨 Colours ', value: 'Coming Soon'}, { name: '🎭 Special Roles', value: 'Coming Soon'}, { name: '💳 Nicknames', value: 'Coming Soon'}, { name: '💯 Server', value: 'Coming Soon'}
          )
          //.addField('Inline field title', 'Some value here', true)
          
          .setFooter('lemonsaltstudio™ - All Rights Reserved. 2021', 'https://i.imgur.com/cLjbtlk.gif');
          
         //https://i.imgur.com/TNm03uY.png
         const welcomeEmbedImage = new Discord.MessageEmbed()
          .setColor('#b6a8ed')
          .setImage('https://i.imgur.com/TNm03uY.png');

          const welcomeEmbedGif = new Discord.MessageEmbed()
          .setColor('#b6a8ed')
          .setImage('https://media.giphy.com/media/sVrNf2cm8q3XGdPfGq/giphy.gif');

          const rulesEmbed = new Discord.MessageEmbed()
          .setColor("#b6a8ed")
          .setTitle("Welcome to LemonSaltStudio. Make sure to read our rules carefully before entering the server.")
          .setDescription("Here we like to learn new things and to laugh out loud,but most importantly, we try to be as friendly and as supportive as we can in the pursuit of our goals.")
          .setAuthor("LemonSaltStudio","https://i.imgur.com/cLjbtlk.gif")
          .setThumbnail("https://i.imgur.com/oyQ2NJi.png")
          .addField("1️⃣ Discord Community", "Follow the Terms of Service from [Discord](https://discord.com/terms).")
          .addField("2️⃣ Diversity", "We have people from all over the world, you have to respect each other. We do not tolerate discrimination of any kinds including (but not limited to) discrimination, or hate speech aimed at race, political view, national or ethnic origin, colour, religion, age, sex, sexual orientation, gender identity or expression, marital status, family status, genetic characteristics or disability.")
          .addField("3️⃣ Server Language","In order to include everyone in our conversations please keep the chat and vocal chat in ENG - IT - FR. ")
          .addField("4️⃣ Privacy","We are a friendly community. However, we must respect others' privacy, thus it is not allowed to dig into personal information or share sensitive data. Violation of this rule will result in a permanent ban.")
          .addField("5️⃣ Mature Content ","Do not post gore, unnecessary violence, and other subject matter deemed too sensitive or offensive.")
          .addField("6️⃣ Respect Others","Name-calling, cursing, expressing deliberately offensive opinions are not allowed, if you wouldn't do it to the face of anyone who might conceivably see what you write, don't write it.Trolling is great, joking greater, harassment is not.")
          .addField("7️⃣ Hacking ","Do not send others viruses or malware, attempt to phish others, or hack or DDoS them. Never click on unfamiliar or unexpected links.")
          .addField("💟 Be You", "Be kind and have fun.")
          .setFooter("LemonSaltStudio©","https://i.imgur.com/cLjbtlk.gif");
          
          const valuesEmbedGif = new Discord.MessageEmbed()
          .setColor('#b6a8ed')
          .setImage('https://media.giphy.com/media/NuTaI6XyymyftpzL7k/giphy.gif');

          const valuesEmbed = new Discord.MessageEmbed()
          .setColor('#b6a8ed')
          .setThumbnail("https://i.imgur.com/DdebFcR.png")
          .addField("💕 People first","We believe in sharing knowledge, empowering others, kindness, memes and friendship. Furthermore we always welcome feedback and ideas on how to improve the server and keep this community awesome.")
          .addField("🎨 Creativity", "*You do not need to be an artist to create something.* Challenge yourself and show your talent. We are waiting for you to shine!")
          .addField("🦄 Acceptance", "Feel free to be yourself, this is a safe space for everyone.");

          

          
          const descriptionEmbed = new Discord.MessageEmbed()
          .setAuthor("LemonSaltStudio", "https://i.imgur.com/cLjbtlk.gif")
          .setColor("#b6a8ed")
          .setFooter("LemonSaltStudio", "https://i.imgur.com/cLjbtlk.gif")
          .setThumbnail("https://i.imgur.com/bmq8Krh.png")
          .setTitle("Features")
          .setURL("https://discord.gg/GyqXUbJ")
          .addField("General Channels", "#🥂〢general: welcome aboard, introduce yourself and be part of the conversation \n #🔒〢confession : Write a private message to @Citronetto using .confession < your message> to send your confession anonymously \n #🔥〢lemons-got-talent : share your creations, links and content for the community here \n #😂〢memes : yes, you know what to do \n #🎨〢louvre : any for of art is welcomed here \n #🛒〢shop use your lemons to buy perks on the server \n #🎁〢redeem : as a Subscriber you have access to this channel to get your redeems \n #✅〢todos : write your to do list of the day")
          .addField("Topics","#💻〢techies : Everything coding, programming and tech related content \n #📱〢uix : UX/UI exercises and portfolio;")
          .addField("Voice Chat", "#🍋 » Lounge : chit chat, deep talks and chilled conversations \n #📚» Create Study Room : Click to create your personal channel")
          .addField("Bots","On the server you can interact with  @Citronetto in #🔒〢confession, #🛒〢shop & ✅〢todos  \n Play with Javascript with  @JSbot, [here]( https://qualche.link/jsbot/) a guide to make the most of it");  
          
          const rolesReaction = new Discord.MessageEmbed()
          .setAuthor("LemonSaltStudio", "https://i.imgur.com/cLjbtlk.gif")
          .setColor("#1ABC9C")
          .setFooter("LemonSaltStudio", "https://i.imgur.com/cLjbtlk.gif")
          .setThumbnail("https://i.imgur.com/DVswcUQ.png")
          .setTitle("Optional Channels")
          .setURL("https://discord.gg/GyqXUbJ")
          .setDescription ("React to the emoji to get access to the relevant content")
          .addField ("💻〢techies:","Coding, Programming & Tech related content")
          .addField("📱〢uix:","UX/UI prototypes, weekly prompts and resources");


          let contentToSend = [welcomeEmbedImage, welcomeEmbedGif, rulesEmbed, valuesEmbedGif, valuesEmbed, descriptionEmbed]
          /*
          for (let index = 0; index < contentToSend.length; index++) {
            message.channel.send(contentToSend[index]);
          }*/
          message.channel.send(rolesReaction);
        break;


        case commands[2]:
          const pollEmbed = new Discord.MessageEmbed()
          .setColor('#811f10')
          .setAuthor('📊 Random Poll', '843793522662047764', 'https://i.imgur.com/cLjbtlk.gif')
          .setDescription('Buy amazing perks using your lemons. Get the most out of your experience on the server and flex like never before!')
          .setThumbnail('https://i.imgur.com/RWME5rd.gif')
          .addFields(
              { name: '🎨 Colours ', value: 'Coming Soon'}, { name: '🎭 Special Roles', value: 'Coming Soon'}, { name: '💳 Nicknames', value: 'Coming Soon'}, { name: '💯 Server', value: 'Coming Soon'}
          )
          //.addField('Inline field title', 'Some value here', true)
          
          .setFooter('Lemon Shop™ - All Rights Reserved. 2021', 'https://imgur.com/SR3EPnc.gif');
          message.channel.send(shopGifEmbed);
        break;
        case commands[3]:
        
        break;
        case commands[4]:
        message.channel.send("Brent shut the fuck up\n https://media.discordapp.net/attachments/816016207902933063/816064014697234492/unknown.png?width=727&height=702\n https://www.instagram.com/brent_temmermans/ \n Don't forget to add this greek god on instagram!");
        break;
        case commands[5]:
        
        break;
        case commands[6]:
        
        break;
        case commands[7]:
        message.channel.send("butt butt butt🍑");
        break;
        case commands[8]:
        
        break;
        case commands[9]:
         let lemons = 0;
          membersDB["database"].forEach(member =>{
            if(member["id"] === message.author.id){
              console.log(member["lemons"]);
              lemons = member["lemons"];
            }
          });
          message.channel.send(message.author.username + " has " + lemons + " lemons!");
        break;
        case commands[10]:
          
        break;
        case commands[11]:
              //message.channel.send(rulesTemplateEmbed)
        break;
        case commands[12]:
            message.channel.send("DM me in private and I'll post your anononymous confession! \n - Maximum 1024 character long \n - Start the message with **.confession**");
          
          
        break;
        case commands[13]:
          
          
        break;

        case commands[14]:
          //message.channel.send(rulesTemplateEmbed);
          break;
        case commands[15]:
          message.channel.send("It's Friday! \n 🥳🥳🥳PARTY BOIS TIME TO SHINE🥳🥳🥳 \n https://www.youtube.com/watch?v=kfVsfOSbJY0");  
          break
        case commands[16]:
          const voteEmbed = new Discord.MessageEmbed()
  .setColor('#f0b6f2')
  .setTitle("Welcome Message👋")
  .addField("🍰We have a new cutie pie!", "🌺We bid you welcome " + member.user.username + "! 😊");
          message.channel.send(voteEmbed)
        default:
          //TODO Handle some kind of exception here.
        break;
    }
  }
  if(message.content.startsWith('https://discord.gg/')){
    //The message is a Discord link and is deleted.
    message.delete();
    //Warn the user and decrease his score.
    //Then delete the bot's message after 5 seconds.
    /*
  if (message.channel.name !== '🤖〢commands' && message.author.id === '235088799074484224') {
    message.delete();
  }*/
  
  //Deletes bot's commands and Rythm's commands
  /*
  if (message.content.startsWith(".") && message.channel.name !== '🤖〢commands' || isACommand(message.content)) {
    message.delete();
  }*/
  }});

// A channel object is a tuple consisting of a voice channel name and its associated text channel name.
// It then communicate with the server object and either removes it or adds it.
let channelObject = {"voiceChannelName": "", "textChannelName": ""};
// Process: Whenever a channel is created it is added to the database to keep track of current channels. 
// The lookup is applied to the database and NOT stdRooms -> therefore soon deprecated!
// As for the channel removal everything stays the same!
// Rather than numbers (from 0 to ...) (depracated) we now use a random emoji to differentiate channels.
// Make sure to check at each new channel that the emoji is not already taken -> store it in a json file and check the json file each time.
let stdRooms = [];// Soon deprecated
let dateRooms = [];// Soon deprecated
let usedEmojies = [];

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (oldState.channel !== null && oldState.channel !== newState.channel) {//oldState.channel !== newState.channel
    console.log(`${oldState.member.displayName} has left ${oldState.channel.name}`);
    if (oldState.channel.name === '🍋 » Lounge') {
        //Check if the channel is empty and if yes delete no micro
        if (channelIsEmpty(oldState)) {
          for(let i = 0; i < channelsDB["database"].length; i++){
            if(channelsDB["database"][i]["voiceChannelName"] === '🍋 » Lounge'){
              channelsDB["database"].splice(i);//It "must" be in the database.
              fs.writeFile("channelsDB.json", JSON.stringify(channelsDB), function(err, data){
                if (err) throw err;
              });
              //let mbDB = openDB("membersDB.json");
    
            }
          }//delete it from the server too.
          oldState.guild.channels.cache.forEach(channel =>{
            if(channel.name === '🍋no-micro'){
              channel.delete();
            }
          });
        }//
      }else if (/📚» Study Room [0-9]/.test(oldState.channel.name)) {
        //console.log(oldState.channel.name + " is among \" /📚» Study Room [0-9]/ \"");
        //console.log(stdRooms);
        if(channelIsEmpty(oldState)){
          // The index of the channel(s) to be deleted.
          let index = oldState.channel.name.split(" ")[3];
          // Go through each channel and find the ones that contain index:
          oldState.guild.channels.cache.forEach(channel =>{
            if(channel.name.includes(index)) {
              //Delete channel from server:
              channel.delete();
              dateRooms.splice(index);
            }
          });
        }
      }
      else{};
    }
  
  
    //NOW WE ONLY TAKE INTO ACCOUNT NEW CONNECTIONS TO A CHANNEL
    if(newState.channel !== null && newState.channel !== oldState.channel){//newState.channel !== oldState.channel
      console.log(`${newState.member.displayName} has joined ${newState.channel.name}`);
      if(newState.channel.name === '🍋 » Lounge'){
        //if no one's in lounge create a no micro channel
        if(newState.channel.members.size === 1 && wasASwitch(oldState, newState)){
          newState.guild.channels.create('🍋no-micro', {type: 'text', parent: '554279368281686029'})
          .then()
          .catch();
          //We push a no micro channel to the database:
          //"voiceChannelName": "", "textChannelName": ""};
          channelObject["voiceChannelName"] = "🍋 » Lounge";
          channelObject["textChannelName"] = "🍋no-micro";
          channelsDB["database"].push(channelObject);
          fs.writeFile("channelsDB.json", JSON.stringify(channelsDB), function(err, data){
            if (err) throw err;
          });
          
        }
        //TODO replace ID by name
      }else if(newState.channel.name === '📚» Create Study Room:'){
        //Whenever someone joins the channel create a channel called Duo
       //TODO start from 1 rather than 0
        let roomName = '📚» Study Room ' + stdRooms.length;
        console.log(emojis);
        console.log('📚» Study Room ' + emojis[Math.floor(Math.random() * emojis.length)]);
        if(newState.channel.members.size === 1 && wasASwitch(oldState, newState)){
          //We create the corresponding study room:
          newState.guild.channels.create('📚study-room-' + stdRooms.length, {type: 'text', parent: '554279368281686029'})
          .then()
          .catch();
          console.log('📚» Study Room ' + emojis[Math.floor(Math.random() * emojis.length)]);
        }
        newState.guild.channels.create(roomName, {type: 'voice', parent: '554279368281686029', userLimit: 20})
        .then((nChannel) =>{
          newState.member.voice.setChannel(nChannel)
        })
        .catch();
        stdRooms.push(roomName);
        //Thereafter move the person to the newly created Duo channel.
        //TODO replace ID by name
      }else{};
    }
  });
// Lemon -> 10 k lemons
// fox -> 67 lemons?
// chick in eggshell -> 1k
//💐","🌷","🌹","🥀","🌺","🌸","🌼","🌻" -> 500
// Constant reward = 100

/**
 * Return true if the string is actually a command and false otherwise.
 * @param {String} string the string to check.
 */

function isACommand(string) {
  let args = string.split(" ");
  let prefix = args[0];
  if(prefix.startsWith(".")){
    let commandString = prefix.substring(1);
    for(let commandStr of commands){
      if(commandString === commandStr){
        return true;
      }
    }
    return false;
  }else{
    return false;
  }
}

// 🎨louvre
client.on('message', message => {
  if (message.channel.id === '815384636746235934' || message.channel.id === '818047977901785089') {
    console.log("Message sent in 🎨〢louvre");
    if(message.attachments.size > 0){
      console.log("Picture detected!");
      message.react('❤️');
    }else {
      message.delete();
    }
  }
});



/**************************************
 *👋 Farewell Message in staff room****
***************************************/
client.on('guildMemberRemove', member => {
  
  // Send the message to a designated channel on a server:
  //const channel = member.guild.channels.cache.find(ch => ch.name === '🔐〢staff-room');
  // Do nothing if the channel wasn't found on this server
  //if (!channel) return;
  // Send the message, mentioning the member
  
  console.log(member.user.username + " just left!");
});

function getGuildObject(guildID){
  return client.guilds.cache.get(guildID);
}
function getChannelObject(guild, channelID){
  return guild.channels.cache.forEach(channel =>{
    if(channel.id === 'channelID'){
      return channel
    }
  });
}
client.on('message', message =>{
    const guild = getGuildObject("554279368281686026");
    if(message.channel instanceof Discord.DMChannel){
if(message.content.startsWith(".confession")){
      console.log(getGuildObject("554279368281686026").name);
      guild.channels.cache.forEach(channel =>{
        if(channel.id === '828177714993299466'){
          const confessionEmbed = new Discord.MessageEmbed()
          .setColor('#f0b6f2')
          .setTitle("🌹Confession System🔒")
          .addField("🌸A new confession just arrived!🤫", message.content.substring(11));
          channel.send(confessionEmbed);
          message.channel.send("Confession successfully sent! 👍");
          //console.log("Confession sent by"  + message.author.username);
        }
      });
    }
    }
    
});

function createEmbed(triple, message){
  const embed = new Discord.MessageEmbed()
          .setColor('#b6a8ed')
          .setTitle("❖ TO DO ❖")
          .setTimestamp()
          .addField("📆 " + message.author.username + "\'s todo list📌", tasksToString(triple["tasks"], triple["tasksDone"]));
  return embed;
}

function createCancelEmbed(message){
  const embed = new Discord.MessageEmbed()
          .setColor('#b6a8ed')
          .setTitle("❖ TO DO ❖")
          .setTimestamp()
          .addField("📆 " + message.author.username + "\'s todo list📌", tasksToString(triple["tasks"], triple["tasksDone"]));
  return embed;
}

function createWellDoneEmbed(message){
  const embed = new Discord.MessageEmbed()
          .setColor('#ccffcc')
          .setTitle("👊 TODO LIST DONE!")
          .setTimestamp()
          .addField("🥳 Well done " + message.author.username + " !","Your todo list is now completed. Rest well! 😇😴");
  return embed;
}

/*
const embedMessage = new Discord.MessageEmbed()
.setAuthor("The author of the message, in our embeds on the server it is usually lemonsaltstudio")
.setColor("#4556") // The colour for the embed, the little bar on the side.
.setDescription("The first text you see at the top")
.setFooter("The footer you know what it is", "Here you can past the link of an image")
.setImage("To display a big picture in the embed, paste the link of the image HERE instead of the text")
.setThumbnail("the little thumbmnail on top you paste the link HERE instead of this text")
.setTimestamp()// i never use it but i guess it just create ... a timestamp (duh)
.setTitle("A title of embed")
.setURL()// I never use it either but you can put a string inside and I guess it'll redirect you to a link when someone clicks on the embed
.addField("My field title", "My field content"); // You can use those as many times as you want. It adds a field with a field title AND a field content
*/

/*
function generateRandomEmote() {
  let rdEmote = emojis[Math.floor(Math.random() * emojis.length)];
  while(usedEmojies.con){

  }
  
}*/
/*
let reactionChannelID = '';
client.on('message', message => {
  
  // If someone reacts -> give role associated to reaction.
  if(message.content.startsWith('.setReactions')){
    message.channel.messages.cache.forEach(messageInCache =>{
      if(messageInCache.id === "852834106231357440"){
        console.log("Message in cache found!" + messageInCache.author.username);
        messageInCache.react("💻");
        messageInCache.react("📱");
      }
    });
    reactionChannelID = message.channel.id;
    addReactions(reactionChannelID);
  }
});

client.on('message', message =>{
  if(message.content.startsWith('.addReactions')){
    addReactions(message.channel.id);
  }
});

function addReactions(reactionChannelID){
  //Bot reacts
  client.channels.cache.forEach(channel =>{
    if(channel.id === reactionChannelID){
      channel.lastMessage.react('😂');
    }
  });
}

client.on('messageReactionAdd', reaction => {
  if(reaction.emoji.id === '817896849288986654'){
    reaction.message.channel.send('You sneaky sneaky');
  }
});

function remindToDrink(channelName) {
  client.channels.cache.forEach(channel =>{
    if(channel.id === channelID){
      // We send a reminder every 60 minutes.
      setInterval(()=>{
        client.channels.cache.forEach(channel =>{
          if(channel.name === channelName){
            channel.send("Don't forget to drink");
          }
        });
      }, 1000*60*60);// 60 min
    }
  });
}*/
/*
client.on('message', message => {
  if(message.channel.id === "852601640192049212"){
    message.react("💻");
    message.react("📱");
  }
});*/

client.on('messageReactionAdd', reaction =>{
  if(reaction.message.id === '852838640446210048'){
    console.log("Role Reaction Detected!");
    if(reaction.emoji === '💻'){
      console.log("Add role 1");
    }else if(reaction.emoji.identifier === ':mobile_phone:'){
      console.log("Add role 2");
    }
  }
});




