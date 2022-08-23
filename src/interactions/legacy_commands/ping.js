module.exports = {
    name: "ping", // command name
    aliases: ["p", "pong"], // Alternate command name(s)
    description: "Ping", // Command description
    execute(client, message, args) {
        const ping = `📈 Ping: ${Math.round(message.client.ws.ping)}ms`
        message.reply(ping);
    }
};