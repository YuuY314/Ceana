const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

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
    {
        name: "soma",
        description: "Soma dois números",
        options: [
            {
                name: "primeiro-numero",
                description: "O primeiro número",
                type: ApplicationCommandOptionType.Number,
                // choices: [
                //     {
                //         name: "um",
                //         value: 1,
                //     },
                //     {
                //         name: "dois",
                //         value: 2,
                //     },
                //     {
                //         name: "tres",
                //         value: 3,
                //     },
                // ],
                required: true,
            },
            {
                name: "segundo-numero",
                description: "O segundo número",
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: "embed",
        description: "Envia uma mensagem embed",
    }
];

const rest = new REST({version: "10"}).setToken(TOKEN);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos...`);

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands} );
        
        console.log("Registrados com sucesso!");
    } catch(error) {
        console.log(`Houve um erro: ${error}`);
    }
})();