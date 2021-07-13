const Discord = require('discord.js');
const PouchDB = require('pouchdb');
const utils = require('./utils');
let db = new PouchDB('users');
let todoDB = new PouchDB('todolists');
module.exports = {
	name: 'display',
	description: 'Something',
	execute(message) {
        if(message.channel.id === "814074843653079050"){
            todoDB.get(message.author.id).then(document => {
                message.channel.send(utils.createEmbed({tasks: document.tasks, tasksDone: document.tasksDone, _id:document._id}, message));
            }).then(() => {
                message.delete();
            }).catch(err => {
                message.reply('Error you don\'t have anything to display');
            });
        }
    },
};
