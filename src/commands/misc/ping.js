module.exports = {
    name: "ping",
    description: "Responde com pong",
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    }
}