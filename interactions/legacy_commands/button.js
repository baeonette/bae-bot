const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "button",
    description: "Get a button",
    execute(client, message, args) {
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("blue_button")
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("🔶")
            );

        message.reply({
            content: "Here's a blue button for you!",
            components: [button]
        });
    }
};