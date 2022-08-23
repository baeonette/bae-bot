module.exports = {
    button_id: "row_demo1",
    description: "Row Demo Buttons",
    async execute(interaction) {
        return interaction.reply({
            content: 'Clicked!',
            ephemeral: true // Visible to the clicker only
        });
    }
};