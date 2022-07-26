const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: "row",
    description: "Row of buttons",
    execute(client, message, args) {
        const rowDemo = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("row_demo1")
                    .setLabel("Primary")
                    .setStyle("PRIMARY"),
                new ButtonBuilder()
                    .setCustomId("row_demo2")
                    .setLabel("Secondary")
                    .setStyle("SECONDARY"),
                new ButtonBuilder()
                    .setCustomId("row_demo3")
                    .setLabel("Success")
                    .setStyle("SUCCESS"),
                new ButtonBuilder()
                    .setCustomId("row_demo4")
                    .setLabel("Danger")
                    .setStyle("DANGER"),
                new ButtonBuilder()
                    .setLabel('Link')
                    .setURL("https://github.com/baeonette")
                    .setStyle("LINK")
            );

        message.channel.send({
            components: [rowDemo],
            content: "Here's a row of buttons for you!"
        });
    }
};