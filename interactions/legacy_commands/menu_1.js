const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
	name: "menu",
	description: "Menu command",
	execute(client, message, args) {
		// Menu 1
		const menu = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
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

		message.channel.send({ content: 'Message Menu Number One!', components: [menu] });
	}
};