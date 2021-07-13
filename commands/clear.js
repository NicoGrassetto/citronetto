const Discord = require('discord.js');
const PouchDB = require('pouchdb');
let db = new PouchDB('users');
let todoDB = new PouchDB('todolists');
module.exports = {
	name: 'clear',
	description: 'Something',
	execute(message) {
        if(message.channel.id === "814074843653079050"){
            //message.channel.send(createCancelEmbed(message));
            todoDB.get(message.author.id).then(document => {
                return todoDB.remove(document._id, document._rev);
            }).then(() => {
                message.channel.send(message.author.username + " your todo list has been cleared!");
            }).catch(err => {
                message.reply('You don\'t have any active todo lists');
            });
            
          }
    },
};
