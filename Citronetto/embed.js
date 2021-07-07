//https://imgur.com/a/IwUWPDR
//https://imgur.com/SR3EPnc
const shopGifEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Some title')
.setURL('https://discord.js.org/')
.setAuthor('Some name', 'https://imgur.com/SR3EPnc', 'https://discord.js.org')
.setDescription('Some description here')
.setThumbnail('https://imgur.com/SR3EPnc')
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)
.addField('Inline field title', 'Some value here', true)
.setImage('https://imgur.com/SR3EPnc')
.setTimestamp()
.setFooter('Some footer text here', 'https://imgur.com/SR3EPnc');


const studyEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/D7cnWZr.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
  .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');


  let rulesTemplateEmbed = {
    "content": "**Server Rules**",
    "embed": {
      "title": "1. ToS of Discord",
      "description": " As we are a community on Discord, people have to follow the ToS from Discord first.",
      "url": "https://discordapp.com",
      "color":13742213,
      "timestamp": "2021-04-07T07:26:28.139Z",
      "footer": {
        "icon_url": "https://i.ibb.co/yFsRtFH/new.gif",
        "text": "LemonSaltStudio ©"
      },
      "thumbnail": {
        "url": "https://i.ibb.co/ZT2qhGM/rules.png"
      },
      "author": {
        "name": "LemonSaltStudio",
        "url": "https://discord.gg/vaFDPgSzxG",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "fields": [
        {
          "name": "2. Diversity",
          "value": "We have people from all over the world, you have to respect each other. We do not tolerate discrimination of any kinds including (but not limited to) discrimination, or hate speech aimed at race, political view, national or ethnic origin, colour, religion, age, sex, sexual orientation, gender identity or expression, marital status, family status, genetic characteristics or disability."
        },
        {
          "name": "3. Community Values",
          "value": "We believe in sharing knowledge, empowering others, kindness, memes and friendship. Furthermore we always welcome feedback and ideas on how to improve the server and keep this community awesome"
        },
        {
          "name": "4. Server Language",
          "value": "In order to include everyone in our conversations please keep the chat and vocal chat in ENG - IT - FR "
        },
        {
          "name": "5. Privacy",
          "value": "We are a friendly community. However, we must respect others' privacy, thus it is not allowed to dig into personal information or share sensitive data.  Violation of this rule will result in a permanent ban."
        },
        {
          "name": "6. Mature Content",
          "value": "Do not post gore, unnecessary violence, and other subject matter deemed too sensitive or offensive"
        },
        {
          "name": "7. Respect Others",
          "value": "Name-calling, cursing, expressing deliberately offensive opinions are not allowed, if you wouldn't do it to the face of anyone who might conceivably see what you write, don't write it.Trolling is great, joking greater, harassment is not"
        },
        {
          "name": "8. Hacking",
          "value": "Do not send others viruses or malware, attempt to phish others, or hack or DDoS them. Never click on unfamiliar or unexpected links"
        },
        {
          "name": "9. Be You",
          "value": "❤️"
        }
      ]
    }
  };

  const roseEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://media.tenor.com/images/259ace7ab1248530af394682ab7e1597/tenor.gif', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://media.tenor.com/images/259ace7ab1248530af394682ab7e1597/tenor.gif')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://media.tenor.com/images/259ace7ab1248530af394682ab7e1597/tenor.gif')
	.setTimestamp()
  .setFooter('Some footer text here', 'https://media.tenor.com/images/259ace7ab1248530af394682ab7e1597/tenor.gif');
  
  const studyEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setDescription('Some description here')
	.setThumbnail('https://media.tenor.com/images/259ace7ab1248530af394682ab7e1597/tenor.gif')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');