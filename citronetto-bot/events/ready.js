module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		console.log(client.user); 
		client.user.setPresence({ activities: [{ name: "Follow my mother's channel at https://www.twitch.tv/lemonsaltstudio" }], status: 'active' });
	},
};