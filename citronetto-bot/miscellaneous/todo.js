const { SlashCommandBuilder } = require('@discordjs/builders');
let db = new PouchDB('users');
//const utils = require('./utils.js');
const PouchDB = require('pouchdb');
const todoDB = new PouchDB('users');
module.exports = {
    //create library for group project
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('Creates a todo list.'),
	async execute(interaction) {
        const todolistChannelID = "814074843653079050";
            if (interaction.channelId === todolistChannelID) {
                const todoObj = todoDB.get(interaction.user.id);
                await interaction.reply("You already have an active todo list. Type .display to inspect it", todoObj);
                   /*
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
                        })*/
                        
            }
	},
};