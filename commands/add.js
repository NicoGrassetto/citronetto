const PouchDB = require('pouchdb');
const Discord = require('discord.js');
let db = new PouchDB('users');
const utils = require('./utils');

let todoDB = new PouchDB('todolists');

todoDB.info().then(function (info) {
    console.log(info);
})

module.exports = {
	name: 'add',
	description: 'Something',
	execute(message) {
    const todolistChannelID = "814074843653079050";
                if(message.channel.id === todolistChannelID){
                        todoDB.get(message.author.id).then(doc => {
                            let tasks = message.content.substring(5).split("|");
                            for(let i = 0; i < tasks.length; i++) {
                                doc["tasks"].push(tasks[i]);
                                doc["tasksDone"].push(false);
                            }
                            doc._rev = doc._rev;
                            return todoDB.put(doc).then(response => {
                                console.log(response);
                            }).catch(err =>{
                                console.log(err);
                            });
                        }).catch(err => {
                            console.log(err)
                        })
                }
        },
};