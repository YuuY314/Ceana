const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: "Somente administradores têm permissão para executar este comando",
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.testOnly){
            if(!(interaction.guild.id === testServer)){
                interaction.reply({
                    content: "Este comando não pode ser executado neste server",
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.permissionsRequired?.length){
            for(const permission of commandObject.permissionsRequired){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: "Sem permissões o suficiente",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        if(commandObject.botPermissions?.length){
            for(const permission of commandObject.botPermissions){
                const bot = interaction.guild.members.me;

                if(!bot.permissions.has(permission)){
                    interaction.reply({
                        content: "Eu não tenho permissões o suficiente",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`Houve um erro ao executar este comando: ${error}`)
    }
};