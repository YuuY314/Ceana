const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getAllFiles(path.join(__dirname, "..", "commands"), true);

    // faz a listagem de todas as pastas de comandos
    // console.log(commandCategories);

    for(const commandCategory of commandCategories){
        const commandFiles = getAllFiles(commandCategory);

        // faz a listagem de todos os comandos de determinada pasta
        // console.log(commandFiles);

        for(commandFile of commandFiles){
            const commandObject = require(commandFile);

            if(exceptions.includes(commandObject.name)){
                continue;
            }

            // descrição do comando
            // console.log(commandObject);
            localCommands.push(commandObject);
        }
    }

    return localCommands;
}