module.exports = {
    menu_id: "select", // Menu ID
    menu_value: "second_option", // Menu value
    description: "Option 2 of menu 2", // Menu Description
    async execute(interaction, client) {
        return interaction.reply({ content: 'Thing two was selected from menu one!', components: [], ephemeral: true });
    }
};