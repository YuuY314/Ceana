const { testServer } = require("../../../config.json");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        // faz a listagem de todos os comandos
        // console.log(localCommands);
        
        const applicationCommands = await getApplicationCommands(client, testServer);

        for(const localCommand of localCommands){
            const { name, description, options } = localCommand;
            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);
            if(existingCommand){
                if(localCommand.deleted){
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Comando "${name}" deletado`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)){
                    await applicationCommands.edit(existingCommand.id, { description, options });
                    console.log(`Comando "${name}" editado`);
                }
            } else {
                if(localCommand.deleted){
                    console.log(`Pulando o registro do comando ${name}, pois está predefinido como deletado`);
                    continue;
                }

                await applicationCommands.create({ name, description, options });
                console.log(`Comando ${name} registrado`);
            }
        }
    } catch(error) {
        console.log(`Houve um erro: ${error}`)
    }
};