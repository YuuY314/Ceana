const { REST, Routes } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [
    {
        name: "hey",
        description: "Responde com hey",
    },
    {
        name: "ping",
        description: "Responde com pong",
    },
];

const rest = new REST({version: "10"}).setToken(TOKEN);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos...`);

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands});
        
        console.log("Registrados com sucesso!");
    } catch(error) {
        console.log(`Houve um erro: ${error}`);
    }
})();