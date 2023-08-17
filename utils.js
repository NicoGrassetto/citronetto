const Discord = require('discord.js');
exports.tasksToString = function(tasksArr, tasksDoneArr) {
	let output = '';
	for (let i = 0; i < tasksArr.length; i++) {
		const task = tasksArr[i].trim();
		const isDone = tasksDoneArr[i] ? '✅' : '⭕️';
		output += `${i + 1}. ${isDone} ${task}\n`;
	}
	return output;
};

function tasksToString(tasksArr, tasksDoneArr) {
	let tasksString = ' ';
	let n = 1;
	tasksArr.forEach((task) => {
		if (tasksDoneArr[tasksArr.indexOf(task)] === true) {
			if (n < 10) {
				tasksString += numberToEmote(n + '') + '⠀✅ ' + task.trim() + '\n';
			}
			else {
				// n >= 10
				tasksString += numberToEmote(n + '') + '⠀✅ ' + task.trim() + '\n';
			}
			console.log(tasksString.trim(task));
		}
		else if (n < 10) {
			tasksString += numberToEmote(n + '') + '⠀⭕️ ' + task + '\n';
		}
		else {
			tasksString += numberToEmote(n + '') + ' ⭕️ ' + task + '\n';
		}
		n++;
	});
	return tasksString;
}
exports.createEmbed = function(triple, message) {
	const embed = new Discord.MessageEmbed()
		.setColor('#b6a8ed')
		.setTitle('Todo List 🗒')
		.setTimestamp()
		.addField(
			'📆 ' + message.author.username + '\'s tasks📌',
			tasksToString(triple.tasks, triple.tasksDone),
		)
		.setThumbnail(message.author.avatarURL())
		.setFooter('LemonSaltStudio©', 'https://i.imgur.com/cLjbtlk.gif');
	return embed;
};

function numberToEmote(number) {
	const digitEmotes = ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'];
	// const digitEmotes = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
	// We assume number is a string.
	const digits = Array.from(number);
	let emotes = '';
	digits.forEach((digit) => {
		for (let index = 0; index < digitEmotes.length; index++) {
			if (index === Number(digit)) {
				emotes += digitEmotes[index];
			}
		}
	});
	return emotes;
}

exports.indexOutOfBound = function(arr, n) {
	if (n <= 0 || n > arr.length) {
		return true;
	}
};

exports.listIsDone = function(listArr) {
	if (listArr.includes(false)) {
		return false;
	}
	return true;
};

/**
 * Create a progression bar made of ascii characters.
 * @param  {Number} elapsedTime The elapsed time since the start. Should never be more than totalTime. If it is the progress bar will be stuck at totalTime.
 * @param  {Number} totalTime The total time towards which the progress bar is progressing.
 * @param  {Number} length The length of the progress bar. That number needs not be of the size of totalTime.
 * @return {String} A string representing the progress bar in ascii characters.
 */
exports.progressBar = function(elapsedTime, totalTime, length) {
	let bar = '';
	const darkArea = '▓';
	const lightArea = '░';
	// Reprensents the number of little chucks the progress bar is divided into.
	const chunk = totalTime / length;
	const chunksInElapsedTime = Math.round(elapsedTime / chunk);

	for (let i = 0; i < length; i++) {
		if (i < chunksInElapsedTime) {
			bar += darkArea;
		}
		else {
			bar += lightArea;
		}
	}
	return bar;
};

exports.isValidTransfer = function(balance, amount) {
	// The transaction doesn't result in a negative balance for the transaction's owner. That is, the owner doesn't transfer more than he has.
	if (
		balance - amount >= 0 &&
    amount > 0 &&
    isFinite(amount) &&
    !isNaN(amount)
	) {
		// We transfer a positive amount.
		return true;
	}
	return false;
};

exports.createSuccessEmbed = function(message, customMessage) {
	const embed = new Discord.MessageEmbed()
		.setColor('#9eff74')
		.setTitle('Action successfull ✔️')
		.setTimestamp()
		.addField(message.author.username, customMessage)
		.setThumbnail('https://i.imgur.com/kXQuYBm.gif')
		.setFooter('LemonSaltStudio©', 'https://i.imgur.com/cLjbtlk.gif');
	return embed;
};

exports.createFailureEmbed = function(message, customMessage) {
	const embed = new Discord.MessageEmbed()
		.setColor('#f74d4b')
		.setTitle('Action unsuccessful ❌')
		.setTimestamp()
		.addField(message.author.username, customMessage)
		.setThumbnail('https://i.imgur.com/VmAkw8Q.gif')
		.setFooter('LemonSaltStudio©', 'https://i.imgur.com/cLjbtlk.gif');
	return embed;
};

exports.createChannelMessageEmbed = function(message, customMessage) {
	console.log(message + customMessage);
	const embed = new Discord.MessageEmbed()
		.setColor('#f74d4b')
		.setTitle('A title')
		.setTimestamp()
		.addField('Welcome', 'a message')
		.addField('Rules', 'a message')
		.addField('Channel', 'a message')
		.setThumbnail('https://i.imgur.com/VmAkw8Q.gif')
		.setFooter('LemonSaltStudio©', 'https://i.imgur.com/cLjbtlk.gif');
	return embed;
};

/**
 *
 * @param {VoiceState} state the voice state
 */
exports.channelIsEmpty = function(state) {
	if (state.channel.members.size === 0) {
		console.log(`${state.channel.name} is now empty.`);
		return true;
	}
	else {
		return false;
	}
};
