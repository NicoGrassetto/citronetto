module.exports = {
    name: 'interactionCreate',
	execute(interaction) {
        if (interaction.isButton()) console.log(interaction);
	},
};