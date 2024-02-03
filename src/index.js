const { Client, IntentsBitField } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();
const { TOKEN } = process.env;

const client =  new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`Eu sou ${c.user.username} e estou online`);
});

client.on("interactionCreate", (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === "hey"){
        interaction.reply("hey");
    } else if(interaction.commandName === "ping"){
        interaction.reply("pong");
    }
});

client.login(TOKEN);