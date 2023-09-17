module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	async execute(oldState, newState) {
		// Here we make sure we are switching from channel to channel. That is, we are not reading a null channel.
		if (newState.channel !== null) {
			if (newState.channel.name === '🍋 » Lounge' && newState.channel.members.size <= 1) {
				if (oldState.channel === null) {
					const parentCategory = newState.channel.parent;
					console.log(parentCategory);
					const newChannel = { name: '🍋no-micro' };
					parentCategory.children.create(newChannel);
				}
			}
		}
	},
};
			// } else if (newState.channel.name === '🍅» Create Work Room:') {
			// 	const categoryName = 'default';
			// 	let voiceChannelName = "default";
			// 	let textChannelName = "default";
			// 	do {
			// 		emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
			// 		categoryName = emote + ' study room'
			// 		voiceChannelName = emote + '» Study Room'
			// 		textChannelName = emote + 'no-micro'

			// 	} while(alreadyTaken(newState, emote));
			// 	console.log(voiceChannelName);
			// 	try {
			// 		const category = await newState.guild.channels.create(categoryName, { type: 'GUILD_CATEGORY' });
			// 	} catch (error) {
			// 		// Handle any errors that occur during channel creation.
			// 		console.error(error);
			// 	}
			// }
// 		}
// 	}
// };
// module.exports = {
// 	name: 'voiceStateUpdate',
// 	once: false,
// 	execute(oldState, newState) {
// 		// Here we make sure we are switching from channel to channel. That is, we are not reading a null channel.
// 		if (newState.channel !== null) {
// 			if (newState.channel.name === '🍋 » Lounge' && newState.channel.members.size <= 1) {
// 				// Create lounge room
// 				if (oldState.channel === null) {
// 					newState.guild.channels.create('🍋no-micro', {type: 'text', parent: '554279368281686029'});
// 				}
// 			} else if (newState.channel.name === '📚» Create Study Room:') {
// 				let categoryName = "default";
// 				let voiceChannelName = "default";
// 				let textChannelName = "default";
// 				do {
// 					emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
// 					categoryName = emote + ' study room'
// 					voiceChannelName = emote + '» Study Room'
// 					textChannelName = emote + 'no-micro'

// 				} while(alreadyTaken(newState, emote));
// 				console.log(voiceChannelName);
// 				newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
// 					.then(category => {
// 						const id = category.id;
// 						newState.guild.channels.create(textChannelName, {type: 'GUILD_TEXT', parent:id})
// 							.then((newlyCreatedChannel) => {
// 								// Random quote sent alongside the embed.
// 								let quote = "";
// 								https.get('https://inspiration.goprogram.ai', res => {
// 									res.setEncoding('utf8');
// 									res.on('data', body => {
// 										quote = JSON.parse(body).quote;
// 									});
// 								});
// 								console.log(quote);
// 								const channelEmbed = new MessageEmbed()
// 									.setColor("BC71FF")
// 									.setTitle("Welcome!")
// 									.addField("Productivity Tools", "Pomodoro timer\nhttps://pomofocus.io/\nTodo list\nhttps://todoist.com/\nForest\n https://www.forestapp.cc/\n Notion\nhttps://www.notion.so/personal")
// 									.addField("Information", "This room is meant to be for studying. We kindly invite you to join the lounge if you wish to take part to any other type of social interaction. The room will be deleted once the last person has left. Thus, also feel free to be yourself! Any server's rule applies in this channel too. Be mindful of others and do not spam too much the channel for it is after all, a study channel, isn't it? 😉")
// 									.addField("Commands", "✅ `/todo`\nCreate and manage your custom todo list with our advanced and one-of-a-kind system.\n🍅 `/pomo`\nStart a pomodoro session either privatly or within the channel.\n👏 `/cheer`\n Cheer up the channel and its members. We all need a bit of motivation. Let's do this!")
// 								// .addField("Random motivational quote:", quote)
// 									.setAuthor("Citronetto")
// 									.setDescription("Congrats! You just created a study room! Don't be shy we are a friendly community. Turn on your camera to get hourly rewards 😎 or use our homemade productivity tools 🛠.")
// 									.setThumbnail('https://i.imgur.com/pT6SM87.png')
// 									.setFooter("LemonSaltStudio©","https://i.imgur.com/cLjbtlk.gif")
// 									.setTimestamp();
// 								newlyCreatedChannel.send({embeds: [channelEmbed]});
// 								// TODO should be set to a drink-water-embed message.
// 								// sendReminder(newlyCreatedChannel);
// 								// TODO Does not switch you to the new channel when you jump into create study room from another study room.
// 							});
// 						newState.guild.channels.create(voiceChannelName, {type: 'GUILD_VOICE', parent:id, userLimit:20, topic:"Study Channel"})
// 							.then(channel => {
// 								newState.member.voice.setChannel(channel);
// 							});

// 					})
// 					.then(() => {
// 						// let emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
// 						// let categoryName = emote + ' study room'
// 						// let voiceChannelName = emote + '» Study Room'
// 						// let textChannelName = emote + 'no-micro'
// 						// console.log(voiceChannelName);

// 						// newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
// 					});
// 			}
// 			else if (newState.channel.name === '🧮» Create Classroom:') {
// 				let categoryName = "default";
// 				let voiceChannelName = "default";
// 				let textChannelName = "default";
// 				do {
// 					emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
// 					categoryName = emote + ' Classroom'
// 					voiceChannelName = emote + '» Classroom'
// 					textChannelName = emote + 'no-micro';

// 				} while (alreadyTaken(newState, emote));
// 				console.log(voiceChannelName);
// 				newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
// 					.then(category => {
// 						const id = category.id;
// 						newState.guild.channels.create(textChannelName, {type: 'GUILD_TEXT', parent:id});
// 						newState.guild.channels.create(voiceChannelName, {type: 'GUILD_STAGE_VOICE', parent:id})// userLimit:20, topic:"Study Channel"
// 							.then(channel => {
// 								newState.member.voice.setChannel(channel);
// 							});

// 					})
// 					.then(() => {
// 						// let emote = emojisArray[Math.floor(Math.random() * emojisArray.length)];
// 						// let categoryName = emote + ' study room'
// 						// let voiceChannelName = emote + '» Study Room'
// 						// let textChannelName = emote + 'no-micro'
// 						// console.log(voiceChannelName);

// 						// newState.guild.channels.create(categoryName, {type: 'GUILD_CATEGORY'})
// 					});
// 			}
// 		}
// 		if (oldState.channel !== null) {
// 			if (oldState.channel.name === '🍋 » Lounge' && oldState.channel.members.size === 0) {
// 				// TODO <user> left the channel -  user joined the channel
// 				console.log('leftlounge');
// 				oldState.guild.channels.cache.forEach(channel => {
// 					if (channel.name === '🍋no-micro') {
// 						channel.delete();
// 					}
// 				});
// 			}
// 			else if (oldState.channel.name.includes('» Study Room') && oldState.channel.members.size === 0) {
// 				// TODO <user> left the channel -  user joined the channel
// 				console.log('leftstudy');
// 				const emoteToBeDeleted = oldState.channel.name.substring(0, 2);
// 				console.log('Emote to be deleted ' + emoteToBeDeleted);
// 				oldState.guild.channels.cache.forEach(channel => {
// 					if (channel.name === emoteToBeDeleted + 'no-micro' || channel.name === emoteToBeDeleted + '» Study Room' || channel.name === emoteToBeDeleted + ' study room') {
// 						channel.delete();
// 					}
// 				});
// 			}
// 			else if (oldState.channel.name.includes('» Classroom') && oldState.channel.members.size === 0) {
// 				const emoteToBeDeleted = oldState.channel.name.substring(0, 2);
// 				console.log('Emote to be deleted ' + emoteToBeDeleted);
// 				oldState.guild.channels.cache.forEach(channel => {
// 					if (channel.name === emoteToBeDeleted + 'no-micro' || channel.name === emoteToBeDeleted + '» Classroom' || channel.name === emoteToBeDeleted + ' Classroom') {
// 						channel.delete();
// 					}
// 				});
// 			}
// 		}
// 	},
// };


// function alreadyTaken(state, emote) {
// 	state.guild.channels.cache.forEach(channel => {
// 		if (channel.name.includes(emote)) {
// 			return false;
// 		}
// 		return false;
// 	});
// }
// /**
//  * Sends a reminder message reminding the user to drink water every hour.
//  * @param {BaseGuildTextChannel} channel
//  */
// function sendReminder(channel) {
// 	// The button row
// 	/*
//     const row = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setCustomId('primary')
// 					.setLabel('Got it!')
// 					.setStyle('PRIMARY'),
// 			);*/
// 	// Do this every 60 minutes
// 	const everyHour = 1000; // prev 60 * 60 * 1000
// 	/*
//     const interval = setInterval(() => {
//         //console.log('Hello world');
//         channel.send({content:'Hello world', components:[row]});
//     }, everyHour);*/
// }