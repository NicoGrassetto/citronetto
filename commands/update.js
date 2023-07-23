const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
        .setDescription('Admin command for channel updates.')
        .addStringOption(option => option.setName('update').setDescription('Your update')),
	async execute(interaction) {
        if (interaction.member.id === '117604414646255618') {
            const row = new MessageActionRow();
            const newRow = new MessageActionRow();

            const highSchool = new MessageButton()
            .setCustomId('🎒 〢 High School')
            .setLabel('High School')
            .setStyle('SECONDARY')
            .setEmoji('🎒');
            row.addComponents(highSchool);

            const undergraduate = new MessageButton()
            .setCustomId('🎓 〢 Undergraduate')
            .setLabel('Undergraduate')
            .setStyle('SECONDARY')
            .setEmoji('🎓');
            row.addComponents(undergraduate);

            const graduate = new MessageButton()
            .setCustomId('🎓 〢 Graduate')
            .setLabel('Graduate')
            .setStyle('SECONDARY')
            .setEmoji('🎓');
            row.addComponents(graduate);

            const phd = new MessageButton()
            .setCustomId('🎓 〢 PhD')
            .setLabel('PhD')
            .setStyle('SECONDARY')
            .setEmoji('🎓');
            row.addComponents(phd);

            const freelance = new MessageButton()
            .setCustomId('💡 〢 Freelance - Entrepreneur')
            .setLabel('Freelance - Entrepreneur')
            .setStyle('SECONDARY')
            .setEmoji('💡');
            row.addComponents(freelance);

            const employee = new MessageButton()
            .setCustomId('💰 〢 Salaried Employee')
            .setLabel('Salaried Employee')
            .setStyle('SECONDARY')
            .setEmoji('💰');
            newRow.addComponents(employee);

            const rolesEmbed = new MessageEmbed()
            .setColor('#FFE961')
            .setFooter('LemonSaltStudio© - All rights reserved')
            .setTitle('')
            .setDescription("What is your most up-to-date status?")
            .addField('sadsa', 'sfdsf')
            
        
            await interaction.channel.send({ embeds: [rolesEmbed], components: [row, newRow] });
            await interaction.reply({ content:'Role successfully added! 👍', ephemeral:true });   
        }
    },
};
            
/*
const updateEmbed = new MessageEmbed()
            .setColor('#fb0808')
            .setTitle("🛍 LemonSaltStudio™ Merch (COMING SOON)")
            .setDescription("Limited Edition of LemonSaltStudio™. Buy some exclusive merch for a limited time. Be the first to get LemonSaltStudio™'s very first collection.")
            .addField("LemonSaltStudio™ Blanket", "Some description")
            .addField("LemonSaltStudio™ Mug", "Some description")
            .addField("LemonSaltStudio™ Stickers", "Some description")
            
            const row = new MessageActionRow();
            
            const blanket = new MessageButton()
            .setLabel('Blanket')
            .setURL('https://www.amazon.co.uk/Bedsure-Fluffy-Blankets-Double-Silver/dp/B0157T2C3G')
            .setStyle('LINK')
            .setEmoji('🧺');
            row.addComponents(blanket);

            const socks = new MessageButton()
            .setLabel('Socks')
            .setURL('https://www.thewhitecompany.com/row/Cashmere-Bed-Socks/p/CSCBS')
            .setStyle('LINK')
            .setEmoji('🧦');
            row.addComponents(socks);

            const hoodie = new MessageButton()
            .setLabel('Hoodie')
            .setURL('https://www.amazon.com/Hemlock-Hoodies-Valentines-Sweatshirt-Pullovers/dp/B07W416HC6')
            .setStyle('LINK')
            .setEmoji('🥷🏽');
            row.addComponents(hoodie);

            const stickers = new MessageButton()
            .setLabel('Stickers')
            .setURL('https://www.amazon.com/Hemlock-Hoodies-Valentines-Sweatshirt-Pullovers/dp/B07W416HC6')
            .setStyle('LINK')
            .setEmoji('🏷');
            row.addComponents(stickers);

            const mug = new MessageButton()
            .setLabel('Mug')
            .setURL('https://www.amazon.com/Hemlock-Hoodies-Valentines-Sweatshirt-Pullovers/dp/B07W416HC6')
            .setStyle('LINK')
            .setEmoji('🍵');
            row.addComponents(mug);

            await interaction.channel.send({ embeds: [updateEmbed] , components: [row]});
            await interaction.reply({ content:'Update successfully applied! 👍', ephemeral:true });
*/

/*
const updateEmbed = new MessageEmbed()
            .setColor('#fb0808')
            .setTitle("🛍 LemonSaltStudio™ Merch")
            .setDescription("Limited Edition of LemonSaltStudio™. Buy some exclusive merch for a limited time. Be the first to get LemonSaltStudio™'s very first collection.")
            .addField("LemonSaltStudio™ Space Pattern", "Some description")
            .addField("LemonSaltStudio™ Black & white Pattern", "**Minimal artwork, black and white design**\nFeatures\nTotes deluxe. Sturdy and stylish with a vivid double-sided print\nAvailable in three sizes: check the size chart to find the right one for you\nDurable 100% polyester shell\nSuper strong cotton shoulder straps are 1\" (2.5cm) wide and 21\" (68cm) long for Small bags, 28\" (71 cm) long for Medium bags, and 29\" (74 cm) long for Large bags\nBright, long-lasting, double-sided design, sublimation printed for you when you order\nGentle machine wash\nLooking for something more lightweight? Try the Cotton Tote Bag");
            
            const row = new MessageActionRow();
            
            const whitePattern = new MessageButton()
            .setLabel('Black & white Pattern')
            .setURL('https://www.redbubble.com/i/tote-bag/Minimal-landscape-by-LemonSaltJane/98105755.PJQVX')
            .setStyle('LINK')
            .setEmoji('🌙');
            row.addComponents(whitePattern);

            const SpacePattern = new MessageButton()
            .setLabel('Space Pattern')
            .setURL('https://www.redbubble.com/shop/ap/98101364?ref=studio-promote')
            .setStyle('LINK')
            .setEmoji('🪐');
            row.addComponents(SpacePattern);

            await interaction.channel.send({ embeds: [updateEmbed] , components: [row]});
            await interaction.reply({ content:'Update successfully applied! 👍', ephemeral:true });

*/