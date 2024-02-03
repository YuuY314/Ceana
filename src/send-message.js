const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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

const roles = [
    {
        id: "1203411558927958016",
        label: "Vermelho",
    },
    {
        id: "1203412333804650516",
        label: "Verde",
    },
    {
        id: "1203412393699446814",
        label: "Azul",
    },
];

client.on("ready", async (c) => {
    try {
        const channel = await client.channels.cache.get("1203210536758546482");
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            )
        });

        await channel.send({
            content: "Adicione ou remova um cargo",
            components: [row],
        });
        
        process.exit();
    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }
});

client.login(TOKEN);