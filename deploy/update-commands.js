// Run this file to deploy new commands globally
const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENT_ID, TOKEN } = require('../config/config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

if (CLIENT_ID === "") { // CLIENT_ID is required to run
    console.log("ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.json");
    process.exit();
};


// Log into bot
client.login(TOKEN);

const commands = [];
const commandsPath = path.join(__dirname, '../interactions/slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

// console.log(commands)

const deployedCommands = []; // Commands that have been deployed
const currentCommands = []; // Commands that are in ../commands/slash

const rest = new REST({ version: '9' }).setToken(TOKEN);

// Fetches all global commands and adds them to the deployedCommands array
rest.get(Routes.applicationCommands(CLIENT_ID))
    .then((data) => {
        data.forEach(c => {
            deployedCommands.push(
                {
                    name: c.name,
                    id: c.id,
                    global: true
                }
            );
        });
        // Pushes current commands ('../commands/slash') so currentCommands array
        commands.forEach(c => {
            currentCommands.push(c.name);
        });
    })
    .then(() => {
        // Get deployed slash command names
        const deployedNames = deployedCommands.map(function (obj) { return obj.name });

        // Find inactive commands
        let diff = deployedNames.filter(x => !currentCommands.includes(x)).toString();

        // Delete inactive command
        deployedCommands.forEach((s, i) => {
            // If an inactive command is found
            if (s.name === diff) {
                console.log("Inactive global slash command found. Starting update process...");
                client.api.applications(CLIENT_ID).commands(s.id).delete();
            }
        });
    }).then(() => {
        // Once finished/If none are found
        console.log("Slash commands are up to date!");
        // Log out of client and stops script
        client.destroy();
        process.exit();
    });

