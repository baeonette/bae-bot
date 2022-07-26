const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { BOT_NAME } = require('../../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command'),

    async execute(interaction, client) {
        let slashCommands = client.slashCommands; // Fetches Legacy commands

        const helpEmbed = new EmbedBuilder()
            .setTitle(`${BOT_NAME}'s Slash Commands`)
            .setColor('#ffffff')

        slashCommands.forEach(cmd => {
            if (cmd.data.name === undefined) return;
            helpEmbed.addField(
                `**/${cmd.data.name}**`,
                `${cmd.data.description}`
            )
        });

        return interaction.reply({
            embeds: [helpEmbed]
        });
    },
};