const { Client, IntentsBitField, EmbedBuilder, Embed } = require("discord.js");

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
    }
    
    if(interaction.commandName === "ping"){
        interaction.reply("pong");
    }

    if(interaction.commandName === "soma"){
        const num1 = interaction.options.get("primeiro-numero")?.value;
        const num2 = interaction.options.get("segundo-numero")?.value;
        
        interaction.reply(`A soma dá ${num1+num2}`);
    }

    if(interaction.commandName === "embed"){
        const embed = new EmbedBuilder()
            .setTitle("Título")
            .setDescription("Descrição")
            .setColor("Random")
            .addFields(
                {
                    name: "Campo 1",
                    value: "Texto campo 1",
                    inline: true,
                },
                {
                    name: "Campo 2",
                    value: "Texto campo 2",
                    inline: true,
                },
            );

        interaction.reply({ embeds: [embed] });
    }
});

client.on("messageCreate", (message) => {
    if(message.content === "embed"){
        const embed = new EmbedBuilder()
            .setTitle("Título")
            .setDescription("Descrição")
            .setColor("Random")
            .addFields(
                {
                    name: "Campo 1",
                    value: "Texto campo 1",
                    inline: true,
                },
                {
                    name: "Campo 2",
                    value: "Texto campo 2",
                    inline: true,
                },
            );
        
        message.channel.send({ embeds: [embed] });
    }
});

client.login(TOKEN);