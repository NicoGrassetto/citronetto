module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'Providing a unique (non toxic) productivity experience to hundreds of users.\n📡 Twitch: https://www.twitch.tv/lemonsaltstudio\n👐 Community: discord.gg/uXM7Hrc8Fd' }], status: 'active' });
	},
};