const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "row",
    description: "Row of buttons",
    execute(client, message, args) {
        const rowDemo = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("row_demo1")
                    .setLabel("Primary")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("row_demo2")
                    .setLabel("Secondary")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("row_demo3")
                    .setLabel("Success")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("row_demo4")
                    .setLabel("Danger")
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setLabel('Link')
                    .setURL("https://discordjs.guide/")
                    .setStyle(ButtonStyle.Link)
            );

        message.channel.send({
            components: [rowDemo],
            content: "Here's a row of buttons for you!"
        });
    }
};