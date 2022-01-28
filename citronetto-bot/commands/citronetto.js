const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('citronetto')
		.setDescription('Get more information about Citronetto.'),
	async execute(interaction) {
		await interaction.reply("Hi I'm Citronetto and I'm currently learning English. Mind your language because I use a Probabilistic Graphical Model to learn the language of this server. Wait what?!'");
	},
};