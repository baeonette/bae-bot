const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "menu2",
    description: "Menu command",
    execute(client, message, args) {
        // Menu 2
        const menu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select2')
					.setPlaceholder('Nothing selected on menu 2')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		message.channel.send({ content: 'Message Menu Number Two!', components: [menu] });
    }
};