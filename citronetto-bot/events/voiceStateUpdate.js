const Keyv = require('keyv');
const keyv = new Keyv(); // for in-memory storage
keyv.on('error', err => console.error('Keyv connection error:', err));
const emojis = '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍ 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷 🕸 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🦣 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🦬 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐕‍🦺 🐈 🪶 🐓 🦃 🦤 🦚 🦜 🦢 🦩 🕊 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁 🐀 🐿 🦔 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🪵 🌱 🌿 ☘️ 🍀 🎍 🪴 🎋 🍃 🍂 🍁 🍄 🐚 🪨 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌚 🌙 🌎 🪐 💫 ⭐️ 🌟 ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🫔 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕️ 🍵 🧃 🥤 🧋 🍶 🧂 💸 💵 💴 💶 💷 💰 💳 💎 🔮 🧿 🔭 🔬 🧬 🦠 🧫 🧪 🌡 🧸 🪆 🎁 🎀 🎊 🎉 🎎 🏮 📓 📔 📒 📕 📗 📘 📙 📚 📖 🔖 🧷 🔗 📎 🖇 📐 📏 🧮';
const emojisArray = emojis.split(' ');
console.log(emojisArray);






module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute (oldState, newState) {
        // Here we make sure we are switching from channel to channel. That is, we are not reading a null channel.
        if (newState.channel !== null) {
            if (newState.channel.name === '🍋 » Lounge' && newState.channel.members.size <= 1) {
                // Create lounge room
                if (oldState.channel === null) {
                    newState.guild.channels.create('🍋no-micro', {type: 'text', parent: '554279368281686029'});
                }
            } else if (newState.channel.name === '📚» Create Study Room:') {
                let categoryName = "default";
                let voiceChannelName = "default";
                let textChannelName = "default";
                do {
                    emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
                    categoryName = emote + ' study room'
                    voiceChannelName = emote + '» Study Room'
                    textChannelName = emote + 'no-micro'
                    
                } while(alreadyTaken(newState, emote));
                console.log(voiceChannelName);
                newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
                .then(category => {
                    const id = category.id;
                    newState.guild.channels.create(textChannelName, {type: 'GUILD_TEXT', parent:id})
                    .then((newlyCreatedChannel) => {
                        //TODO should be set to a drink-water-embed message.
                        sendReminder(newlyCreatedChannel);
                        //TODO Does not switch you to the new channel when you jump into create study room from another study room.
                    });
                    newState.guild.channels.create(voiceChannelName, {type: 'GUILD_VOICE', parent:id, userLimit:20, topic:"Study Channel"})
                    .then(channel => {
                        newState.member.voice.setChannel(channel);
                    });

                })
                .then(() => {
                        //let emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
                        //let categoryName = emote + ' study room'
                        //let voiceChannelName = emote + '» Study Room'
                        //let textChannelName = emote + 'no-micro'
                        //console.log(voiceChannelName);
                    
                    //newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
                });
            } else if(newState.channel.name === '🧮» Create Classroom:') {
                let categoryName = "default";
                let voiceChannelName = "default";
                let textChannelName = "default";
                do {
                    emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
                    categoryName = emote + ' Classroom'
                    voiceChannelName = emote + '» Classroom'
                    textChannelName = emote + 'no-micro'
                    
                } while(alreadyTaken(newState, emote));
                console.log(voiceChannelName);
                newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
                .then(category => {
                    const id = category.id;
                    newState.guild.channels.create(textChannelName, {type: 'GUILD_TEXT', parent:id});
                    newState.guild.channels.create(voiceChannelName, {type: 'GUILD_STAGE_VOICE', parent:id})//userLimit:20, topic:"Study Channel"
                    .then(channel => {
                        newState.member.voice.setChannel(channel);
                    });

                })
                .then(() => {
                        //let emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
                        //let categoryName = emote + ' study room'
                        //let voiceChannelName = emote + '» Study Room'
                        //let textChannelName = emote + 'no-micro'
                        //console.log(voiceChannelName);
                    
                    //newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
                });
            }
        }
        if (oldState.channel !== null) {
            if (oldState.channel.name === '🍋 » Lounge' && oldState.channel.members.size === 0) {
                //TODO <user> left the channel -  user joined the channel 
                console.log('leftlounge');
                oldState.guild.channels.cache.forEach(channel => {
                    if(channel.name === '🍋no-micro'){
                      channel.delete();
                    }
                });
            } else if (oldState.channel.name.includes('» Study Room') && oldState.channel.members.size === 0) {
                //TODO <user> left the channel -  user joined the channel 
                console.log('leftstudy');
                const emoteToBeDeleted = oldState.channel.name.substring(0, 2);
                console.log('Emote to be deleted ' + emoteToBeDeleted);
                oldState.guild.channels.cache.forEach(channel => {
                    if(channel.name === emoteToBeDeleted + 'no-micro' || channel.name === emoteToBeDeleted + '» Study Room' || channel.name === emoteToBeDeleted + ' study room'){
                      channel.delete();
                    }
                });
            } else if (oldState.channel.name.includes('» Classroom') && oldState.channel.members.size === 0) {
                const emoteToBeDeleted = oldState.channel.name.substring(0, 2);
                console.log('Emote to be deleted ' + emoteToBeDeleted);
                oldState.guild.channels.cache.forEach(channel => {
                    if(channel.name === emoteToBeDeleted + 'no-micro' || channel.name === emoteToBeDeleted + '» Classroom' || channel.name === emoteToBeDeleted + ' Classroom'){
                      channel.delete();
                    }
                });
            }
        }		
	},
};

function alreadyTaken(state, emote) {
    state.guild.channels.cache.forEach(channel => {
        if(channel.name.includes(emote)){
          return false;
        }
        return false;
    });
}
/**
 * Sends a reminder message reminding the user to drink water every hour.
 * @param {BaseGuildTextChannel} channel 
 */
function sendReminder(channel) {
    // The button row
    /*
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Got it!')
					.setStyle('PRIMARY'),
			);*/
    //Do this every 60 minutes
    const everyHour =   1000;// prev 60 * 60 * 1000
    /*
    const interval = setInterval(() => {
        //console.log('Hello world');
        channel.send({content:'Hello world', components:[row]});
    }, everyHour);*/
}