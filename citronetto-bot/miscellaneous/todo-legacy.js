const PouchDB = require('pouchdb');
const Discord = require('discord.js');
let db = new PouchDB('users');
const utils = require('./utils');

let todoDB = new PouchDB('todolists');

todoDB.info().then(function (info) {
    console.log(info);
})

module.exports = {
	name: 'todo',
	description: 'Something',
	execute(message) {
    const todolistChannelID = "814074843653079050";
                if(message.channel.id === todolistChannelID){
                        todoDB.get(message.author.id).then(doc => {
                          message.reply("You already have an active todo list. Type .display to inspect it");
                        }).catch(err => {
                          let tasks = message.content.substring(6).split("|");
                          //We create an array containing a boolean for each task. Each task is either done -> true or not done -> false
                          let tasksDone = [];
                          for(let i = 0; i < tasks.length; i++){
                            tasksDone.push(false);
                          }
                          //This triple is used throughout the entire todo list handler.
                          let triple = {tasks:tasks, tasksDone: tasksDone, _id:message.author.id};
                          //A function handle the conversion to the right format. (Raw tasks to a displayable format)
                          //console.log("Format: \n" + utils.tasksToString(tasks, tasksDone));
                          // Update the database:
                          todoDB.put(triple);
                          message.channel.send("Todo list created!");
                          message.channel.send(utils.createEmbed(triple, message));
                        })
                }
        },
};


/*
                                console.log('Todo list created!');
                                let tasks = message.content.substring(6).split("|");
                                //We create an array containing a boolean for each task. Each task is either done -> true or not done -> false
                                let tasksDone = [];
                                for(let i = 0; i < tasks.length; i++){
                                        tasksDone.push(false);
                                }
                                //This triple is used throughout the entire todo list handler.
                                let triple = {tasks:tasks, tasksDone: tasksDone, _id:message.author.id};
                                console.log(tasks);
                                //A function handle the conversion to the right format. (Raw tasks to a displayable format)
                                console.log("Format: \n" + utils.tasksToString(tasks, tasksDone));
                                // Update the database:
                                todoDB.put(triple);
                                message.channel.send(utils.createEmbed(triple, message));

*/