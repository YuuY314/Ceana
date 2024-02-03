const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");

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

let status = [
    {
        name: "Estou às suas ordens",
        type: ActivityType.Custom,
    },
    {
        name: "palavras ao vento",
        // default sendo Playing
    },
    {
        name: "o sol nascer",
        type: ActivityType.Watching,
    },
    {
        name: "uma música calma",
        type: ActivityType.Listening,
    },
];

client.on("ready", (c) => {
    console.log(`Eu sou ${c.user.username} e estou online`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 30000)
});

client.on("interactionCreate", async (interaction) => {
    try {
        if(interaction.isButton()){
            await interaction.deferReply({ ephemeral: true });
            const role = interaction.guild.roles.cache.get(interaction.customId);
            if(!role){
                interaction.editReply({
                    content: "Não achei esse cargo",
                });
                return;
            }
    
            const hasRole = interaction.member.roles.cache.has(role.id);
            if(hasRole){
                await interaction.member.roles.remove(role);
                await interaction.editReply(`O cargo ${role} foi removido`);
                return;
            }
    
            await interaction.member.roles.add(role);
            await interaction.editReply(`O cargo ${role} foi adicionado`);
        }
    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }

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