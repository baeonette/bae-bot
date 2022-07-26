// Run this file to deploy new commands globally
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { CLIENT_ID, DEV_GUILD_ID, TOKEN } = require('../config/config.json');

if (CLIENT_ID === "") { // CLIENT_ID is required to run
    console.log("ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.json");
    process.exit();
};

const rest = new REST({ version: '10' }).setToken(TOKEN); // Now using v10

rest.put(Routes.applicationGuildCommands(CLIENT_ID, DEV_GUILD_ID), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);


