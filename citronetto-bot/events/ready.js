const userController = require('../userController.js');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		console.log(client.user); 
		client.user.setPresence({ activities: [{ name: "Follow my mother's channel at https://www.twitch.tv/lemonsaltstudio" }], status: 'active' });
		const guild = client.guilds.cache.get("554279368281686026");
		guild.members.fetch()
		.then(members => {
			members.forEach(member => {
				//console.log(member.user.id);
				if(member.user.bot === false) {
					//Check if the user is already in the database
					userController.findUsersWhere(member.id)
					.then(users => {
						if (users.length === 0) {// The user isn't in the database.
							userController.addUser(member.id);
							console.log(`${member} added to the database!`);
						}
					});
				}
			});
		});
	},
};

	
	
		
		
	

