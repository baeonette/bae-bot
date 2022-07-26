// Run this file to deploy new commands globally
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { CLIENT_ID, TOKEN } = require('../config/config.json');

if (CLIENT_ID === "") { // CLIENT_ID is required to run
    console.log("ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.json");
    process.exit();
};

const commands = [];
const commandsPath = path.join(__dirname, '../interactions/slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.command.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered global application commands.'))
    .catch(console.error);