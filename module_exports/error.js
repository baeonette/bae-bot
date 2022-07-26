// Import
const { EmbedBuilder } = require('discord.js');

// Error Logger
module.exports = (client, error, channel_id, type = "Legacy/Slash/Button/Menu") => {

    if (client.channels.cache.get(channel_id) === undefined) return; // Return if no channel is provided

    try {
        const errorEmbed = new EmbedBuilder()
            .setTitle('Terminal')
            .setAuthor({ name: `${type} Commands` })
            .setColor('#000000')
            .setDescription("```" + `ERROR: ${error}` + "```")
            .setTimestamp()

        client.channels.cache.get(channel_id)
            .send({
                embeds: [errorEmbed]
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err)
    };
};