const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "button",
    description: "Get a button",
    execute(client, message, args) {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("blue_button")
                    .setLabel("Click me!")
                    .setStyle("PRIMARY")
                    .setEmoji("🔶")
            );

        message.reply({
            content: "Here's a blue button for you!",
            components: [button]
        });
    }
};