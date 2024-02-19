const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Expulsa alguém do server",
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: "membro-selecionado",
            description: "O membro que você quer expulsar",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: "motivo",
            description: "O motivo da expulsão",
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [ PermissionFlagsBits.Administrator ],
    botPermissions: [ PermissionFlagsBits.Administrator ],

    callback: (client, interaction) => {
        interaction.reply(`Banido`);
    }
}