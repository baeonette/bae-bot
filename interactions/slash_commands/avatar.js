const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar') // Slash command name
        .setDescription('Get user avatar.') // Slash command description
        .addUserOption(option => option.setName('mention').setDescription('View a users avatar')),

    async execute(interaction) {
        const user = interaction.options.getUser('mention');
        if (user) { // If user is mentioned

            const avatarEmbed = new MessageEmbed()
                .setAuthor({ name: `${user.username}'s Avatar` })
                .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(interaction.guild.members.cache.get(user.id).displayHexColor)

            return interaction.reply({
                embeds: [avatarEmbed]
            })
        };
        // Default
        const avatarEmbed = new MessageEmbed()
            .setAuthor({ name: `${interaction.user.username}'s Avatar` })
            .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(interaction.member.displayHexColor)

        return interaction.reply({
            embeds: [avatarEmbed]
        });
    },
};