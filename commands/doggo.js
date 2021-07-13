const fs = require('fs');
const superagent = require('superagent');

module.exports = {
	name: 'doggo',
	description: '.doggo sends an image of Yuki\'s friends',
	execute(message) {
        console.log('doggo executed');
        /*
        superagent.get(`https://dog.ceo/api/breed/Shiba/images/random`).end((err, result) => {
        if (err) return console.log(err.message);    
        console.log(result.body.message);
        });
        message.channel.send(result.body.message);*/
	},
};