module.exports = {
    menu_id: "select2", // Menu ID
    menu_value: "first_option", // Menu value
    description: "Option 1 of menu 2", // Menu Description
    async execute(interaction, client) {
        return interaction.reply({ content: 'Thing one was selected from menu two!', components: [], ephemeral: false });
    }
};