# Bae Bot (Modular Starter Bot with Discord.JS)

__ABOUT__

Simple bot using v14 of Discord.js

- NodeJS v16 [You can run `nvm use 16` to use version 16 of node]
- npm v8
- Discord.js v14

### Check out the @discordjs-cli/discordjs-cli command line interface on NPM

__QUICK STARTUP__

⚠️ **Note: Use version 16 of NodeJS to avoid errors: run `nvm use 16` to use version 16** ⚠️
*You may need to install nvm*

Click the green "Code" button, then in the HTTPS tab, click "Download ZIP".

OR

```
git clone https://github.com/baeonette/bae-bot.git
cd bae-bot
```

⚠️ **Note: Never commit or share your token** ⚠️

REQUIRED: Add the Token, Client/Application ID, Prefix, as well as a test server ID to `./src/config/config.json`. The test server ID will be the server slash commands get deployed to when they're in development and not quite ready to be deployed globally.

Run `npm run initial-startup` to install dependencies, deploy slash commands to specified test server, and run bot.



__STARTUP__

Run `npm i` to install dependencies.

Add the Token, Client/Application ID, Prefix, as well as a test server ID to `./src/config/config.json`. The test server ID will be the server slash commands get deployed to when they're in development and not quite ready to be deployed globally.

Next, run `npm run deploy-dev` to deploy slash commands to your test server, or run `npm run deploy-global` to deploy them globally. NOTE: Global slash commands can take up to an hour to register.

To run the project, use `npm start`, `node index.js` or `node .`.

You can add and remove slash commands at any time. They wont be visible though, unless you run `npm run deploy-dev` to deploy them to your test server, or `npm run deploy-global` to deploy them globally.

Deploying to a test server is ideal for development, as they deploy instantly, and only that server can use them so you don't have people using it without it being ready.

If you decide to delete a global slash command, simply remove the file, and run `npm run delete-slash-commands`. This will delete ALL global and guild slash commands from the discord API. Once that is completed, you can run `npm run deploy-dev`, or `npm run deploy-global` to re-deploy the remaining commands.



NOTE: Running `npm run delete-slash-commands` removes all slash commands from the Discord API. IMPORTANT: This does NOT delete any files, it simply removes the slash commands from Discord.



*Optional:*
- You can add a logs channel ID to `./src/config/config.json` where error messages will be sent, as well as being logged in the console.
  
