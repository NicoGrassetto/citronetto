const { EmbedBuilder } = require('discord.js');

function tasksToString(tasksArr, tasksDoneArr) {
	// console.log(tasksArr);
	let output = '';
	for (let i = 0; i < tasksArr.length; i++) {
		const task = tasksArr[i].trim();
		const isDone = tasksDoneArr[i] ? '✅' : '⭕️';
		output += `${i + 1}. ${isDone} ${task}\n`;
	}
	return output;
}

/**
 * Create a TODO list embed.
 * @param  {BaseInteraction} interaction A Discord interaction.
 * @param  {TODOList} list A TODOList object representing the TODO list.
 * @return {EmbedBuilder} An EmbedBuilder object representing an Embed object.
 */
exports.createTODOListEmbed = function(interaction, list) {

	const TODOListEmbed = new EmbedBuilder()
		.setColor('#b6a8ed')
		.setTitle('Todo List 🗒')
		.setTimestamp()
		.addFields({ name: `📆 ${interaction.user.username}'s tasks📌`, value: tasksToString(list.descriptions, list.statuses) })
		.setAuthor({ name: 'Citronetto', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
		.setThumbnail(interaction.user.avatarURL())
		.setFooter({ text: 'LemonSaltStudio©', iconURL: 'https://i.imgur.com/cLjbtlk.gif' });
	return TODOListEmbed;
};

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

exports.createSuccessEmbed = function(interaction, customMessage) {
	const embed = new EmbedBuilder()
		.setColor('#9eff74')
		.setTitle('Action successfull ✔️')
		.setTimestamp()
		.addFields({ name: interaction.user.username, value: customMessage })
		.setThumbnail('https://i.imgur.com/kXQuYBm.gif')
		.setFooter({ text: 'LemonSaltStudio©', iconURL: 'https://i.imgur.com/cLjbtlk.gif' });
	return embed;
};

exports.TODOListCreatedSuccessEmbed = new EmbedBuilder()
	.setColor('#9eff74')
	.setTitle('Action successfull ✔️')
	.setAuthor({ name: 'Citronetto', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
	.setDescription('You just created a TODO list! Congratulations! 🥳\n Bellow you will find a list of handy commands for your productivity journey.')
	.setThumbnail('https://i.imgur.com/YDnia5V.gif')
	.addFields(
		{ name: '`/add`', value: 'Add a new task to your todo list.' },
		{ name: '`/display`', value: 'Display your todo list.' },
		{ name: '`/undo`', value: 'Set a task to `todo`.' },
		{ name: '`/modify`', value: 'Modify a task in your todo list.' },
		{ name: '`/done`', value: 'Set a task as `done`.' },
	)
	.setFooter({ text: 'LemonSaltStudio©', iconURL: 'https://i.imgur.com/cLjbtlk.gif' });

exports.createFailureEmbed = function(interaction, customMessage) {
	const embed = new EmbedBuilder()
		.setColor('#f74d4b')
		.setTitle('Action unsuccessful ❌')
		.setTimestamp()
		.addFields({ name: interaction.user.username, value: customMessage })
		.setThumbnail('https://i.imgur.com/VmAkw8Q.gif')
		.setFooter({ text: 'LemonSaltStudio©', iconURL: 'https://i.imgur.com/cLjbtlk.gif' });
	return embed;
};

exports.createChannelMessageEmbed = function(message, customMessage) {
	console.log(message + customMessage);
	const embed = new EmbedBuilder()
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
