const Discord = require('discord.js');
const PouchDB = require('pouchdb');
let db = new PouchDB('users');
let todoDB = new PouchDB('todolists');
const utils = require('./utils');
module.exports = {
	name: 'cancel',
	description: 'Something',
	execute(message) {
        if(message.channel.id === "814074843653079050"){
          // Get an array with each number:    
          let nbrArray = message.content.substring(8).split(",");
          console.log(nbrArray);
          //Look for user's ID:
          todoDB.get(message.author.id).then(document => {
            for(let i = 0; i < nbrArray.length; i++) {
              if(utils.indexOutOfBound(document["tasks"], nbrArray[i])){
                message.channel.send("Nice try but a number is not valid.");
                break;
              }else{
                // We loop through the array of tasks to be deleted:
                for(let j = 0; j < nbrArray.length; j++){
                  document["tasks"].splice(nbrArray[j]-1, 1); //-1 because the numbers in the todo list are displayed from 1 onwards.
                  document["tasksDone"].splice(nbrArray[j]-1, 1); 
                  console.log(document["tasks"]);
                }
                document._rev = document._rev
                message.channel.send(utils.createEmbed(document, message));
                return todoDB.put(document);
              }
            }
          }).then(response => {
            console.log(response);
          }).catch(err => {
            console.log(err);
            message.reply("You don't have any active todo list. Please use .todo <a task>|<another task>| ...");
          });
        }
    },
};
        
          
          /*
          if(utils.listIsDone(document["tasksDone"])){
            message.channel.send(utils.createWellDoneEmbed(message));
            // The todo list is done and we delete it from the database.
            todoDB.get(document._id).then(doc => {
              return todoDB.remove(doc);
            }).catch(error => {
              console.log(error);
            });
          }*/
      
    