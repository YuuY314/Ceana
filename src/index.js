const { Client, IntentsBitField } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();
const { TOKEN } = process.env;

const eventHandler = require("./handlers/eventHandler.js");

const client =  new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.login(TOKEN);