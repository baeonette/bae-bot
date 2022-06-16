![logo](https://i.imgur.com/njKdmpY.png)

# Bae Bot (Modular Starter Bot with Discord.JS)

__ABOUT__

Simple bot using v13 of Discord.js

- NodeJS v16 [You can run `nvm use 16` to use version 16 of node]
- npm v8
- Discord.js v13



__QUICK STARTUP__

Click the green "Code" button, then in the HTTPS tab, click "Download ZIP".

OR

```git clone https://github.com/baeonette/bae-bot.git
cd bae-bot
```

⚠️ **Note: Never commit or share your token** ⚠️

REQUIRED: Add the Token, Client/Application ID, Prefix, as well as a test server ID to `./config/config.json`. The test server ID will be the server slash commands get deployed to when they're in development and not quite ready to be deployed globally.

Run `npm run initial-startup` to install dependencies, deploy slash commands to specified test server, and run bot.



__STARTUP__

Run `npm i` to install dependencies.

Add the Token, Client/Application ID, Prefix, as well as a test server ID to `./config/config.json`. The test server ID will be the server slash commands get deployed to when they're in development and not quite ready to be deployed globally.

Next, run `npm run deploy-dev` to deploy slash commands to your test server, or run `npm run deploy-global` to deploy them globally. NOTE: Global slash commands can take up to an hour to register.

To run the project, use `npm start`, `node index.js` or `node .`.

You can add and remove slash commands at any time. They wont be visible though, unless you run `npm run deploy-dev` to deploy them to your test server, or `npm run deploy-global` to deploy them globally.

Deploying to a test server is ideal for development, as they deploy instantly, and only that server can use them so you don't have people using it without it being ready.

If you decide to delete a global slash command, simply remove the file, and run `npm run update-global`. This will delete global slash commands no longer in `./interactions/slash_commands`.



NOTE: Running `npm run update-global` does not add new commands, it only checks if commands have been removed. That way you have more control over when and where slash commands get released to.



*Optional:*
- You can add a logs channel ID to `./config/config.json` where error messages will be sent, as well as being logged in the console.
  