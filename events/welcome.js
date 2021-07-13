const Discord = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(member) {
		//let memberObj = {"id":member.id, "lemons": 100};
          //membersDB["database"].push(memberObj);
          //fs.writeFile("membersDB.json", JSON.stringify(membersDB), function(err, data){
            //if (err) throw err;
          //});
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === '🥂〢general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  const welcomeEmbed = new Discord.MessageEmbed()
  .setColor('#f0b6f2')
  .setTitle("Welcome Message👋")
  .addField("🍰We have a new cutie pie!", "🌺We bid you welcome " + member.user.username + "! 😊");
  channel.send(welcomeEmbed);
  let role= member.guild.roles.cache.find(role => role.id === "762268555361386516");
  member.roles.add(role);
	},
};