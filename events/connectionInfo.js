const {Client, MessageEmbeds} = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'ready',
	once: true,
	execute() {
		console.log('==================================');
  		console.log(' ❏ Client ready!\n ❏ Client running!\n ❏ Authors: Nico Grassetto - Federica Nocerino\n ❏ Welcome Nico Grassetto!');
		console.log('==================================');
	},
};