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

client.on("messageCreate", (message) => {
    if(message.author.bot){
        return;
    }
    
    if(message.content === "olá"){
        message.reply(`olá ${message.author}`);
    }
});

client.login(TOKEN);