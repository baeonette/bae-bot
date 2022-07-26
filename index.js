// Import Discord.js
const {
    GatewayIntentBits,
    Client,
    Collection,
    ActivityType,
    Partials
} = require('discord.js');

// Import Configurations
const {
    TOKEN,
    PREFIX,
    LOG_CHANNEL,
    BOT_NAME,
    ACTIVITY,
    TYPE,
    STATUS
} = require('./config/config.json');

// Import Module Exports
const ready = require('./module_exports/ready.js');
const logError = require('./module_exports/error.js');

// Create Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
    partials: [ // Add partials so we get data
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember
    ]
});

// Require FS and Path for directory/file reading
const fs = require('node:fs');
const path = require('node:path');

// Slash Command Handler
client.slashCommands = new Collection();
const commandsPath = path.join(__dirname, 'interactions/slash_commands');
const slashCommandFiles =
    fs.readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.slashCommands.set(command.data.name, command);
};

// Button Handler
client.buttonHandler = new Collection();
const buttonDirs = fs.readdirSync("interactions/buttons");
for (const buttonPath of buttonDirs) {
    const buttonFiles =
        fs.readdirSync("interactions/buttons/" + buttonPath)
            .filter(x => x.endsWith('.js'));

    for (buttonFile of buttonFiles) {
        const button = require(path.join(__dirname, "interactions/buttons/" + buttonPath + "/" + `${buttonFile}`));
        client.buttonHandler.set(button.button_id, button);
    }
};

// Menu Handler
client.menuHandler = new Collection(); // Menu handler
const menuDirs = fs.readdirSync("interactions/menus");
for (const menuPath of menuDirs) {
    const menuFiles =
        fs.readdirSync("interactions/menus/" + menuPath)
            .filter(x => x.endsWith('.js'));

    for (menuFile of menuFiles) {
        const menu = require(path.join(__dirname, "interactions/menus/" + menuPath + "/" + `${menuFile}`))
        client.menuHandler.set(
            `${menu.menu_id}%%${menu.menu_value}`, // String interpolation so we can check both the ID and values, that way different menus can use the same value without us running into problems. I used double percentages, as I figure the likelihood of a menu having double percentage is slim to none.
            menu
        );
    }
};

// Legacy Command Handler
client.legacyCommands = new Collection();
const commandFiles =
    fs.readdirSync(path.join(__dirname, "interactions/legacy_commands"))
        .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, "interactions/legacy_commands", `${file}`));
    client.legacyCommands.set(command.name, command);
};

// Slash Command/Button/Menu event
client.on('interactionCreate', async interaction => {
    // Slash commands
    if (interaction.isCommand()) {

        const command =
            client.slashCommands.get(interaction.commandName); // Get commands

        if (!command) return; // Return if no slash command is found

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command :/', ephemeral: true });

            // Log error in Logs channel
            logError(
                client,
                error,
                LOG_CHANNEL,
                "Slash"
            );
        }
    };

    // Buttons
    if (interaction.isButton()) {

        // Fetch buttons with the same button ID
        const button =
            client.buttonHandler.get(interaction.customId); // Get button IDs

        if (!button) return; // Return if no button is found

        try {
            button.execute(interaction, client);
        } catch (error) {
            console.log(error);

            // Log error in Logs channel
            logError(
                client,
                error,
                LOG_CHANNEL,
                "Buttons"
            );
        };
    };

    // Menus
    if (interaction.isSelectMenu()) {

        const menu =
            client.menuHandler.get(interaction.customId + "%%" + interaction.values[0]); // Gets menu

        if (!menu) return;

        try {
            menu.execute(interaction, client);
        } catch (error) {
            console.log(error);

            // Log error in Logs channel
            logError(
                client,
                error,
                LOG_CHANNEL,
                "Menus"
            );
        }

    };

});

// Legacy Commands Message Event
client.on('messageCreate', message => {
    if (message.author.bot || !message.guild) return; // Return if author is a bot, or using DM's

    if (!message.content.startsWith(PREFIX)) return; // Ignore messages that don's start with the prefix

    let args = message.content.slice(PREFIX.length).split(' ');
    const commandName = args.shift().toLowerCase();

    // Fetch commands
    const command =
        client.legacyCommands.get(commandName) ||
        client.legacyCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return; // Return if no command is found

    try {
        command.execute(client, message, args);
    } catch (error) {
        console.log(error);

        // Log error in Logs channel
        logError(
            client,
            error,
            LOG_CHANNEL,
            "Legacy"
        );
    };
});

// Ready Event
client.on('ready', async () => {
    ready(BOT_NAME);

    // Set bot presence in ./config/config.json
    client.user.setPresence({
        activities: [
            {
                name: `${ACTIVITY}`,
                type: ActivityType[TYPE],

            }
        ], status: `${STATUS}` // Playing, Watching, Listening, Competing, Streaming
    });
});
// Set token in ./config/config.json
client.login(TOKEN);
