const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction) {
        const ping = `📈 Ping: ${Math.round(interaction.client.ws.ping)}ms`
        return interaction.reply(ping);
    },
};