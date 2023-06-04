//$$\      $$\ $$\           $$\       $$\   $$\                    $$\                           
//$$$\    $$$ |\__|          \__|      $$ | $$  |                   $$ |                          
//$$$$\  $$$$ |$$\ $$$$$$$\  $$\       $$ |$$  /  $$$$$$\  $$$$$$\  $$ |  $$\  $$$$$$\  $$$$$$$\  
//$$\$$\$$ $$ |$$ |$$  __$$\ $$ |      $$$$$  /  $$  __$$\ \____$$\ $$ | $$  |$$  __$$\ $$  __$$\ 
//$$ \$$$  $$ |$$ |$$ |  $$ |$$ |      $$  $$<   $$ |  \__|$$$$$$$ |$$$$$$  / $$$$$$$$ |$$ |  $$ |
//$$ |\$  /$$ |$$ |$$ |  $$ |$$ |      $$ |\$$\  $$ |     $$  __$$ |$$  _$$<  $$   ____|$$ |  $$ |
//$$ | \_/ $$ |$$ |$$ |  $$ |$$ |      $$ | \$$\ $$ |     \$$$$$$$ |$$ | \$$\ \$$$$$$$\ $$ |  $$ |
//\__|     \__|\__|\__|  \__|\__|      \__|  \__|\__|      \_______|\__|  \__| \_______|\__|  \__|
// Versão 3.0.0
// Desenvolvido por: Quir & Rinne
// minikraken.tk
const fs = require("fs");
const { Collection } = require("discord.js");
/**
 * @return {Collection<string, import('app/typings').SlashInteractionCommand>}
 * @description Todos os slash commands.
 */
function slashCommands() {
    /**
     * @type {String[]}
     * @description All slash commands.
     */
    const slashCommands = fs.readdirSync("./interactions/slash");
    const collection = new Collection();
    
    // Loop through all files and store slash-commands in slashCommands collection.
    
    for (const module of slashCommands) {
        const commandFiles = fs
            .readdirSync(`./interactions/slash/${module}`)
            .filter((file) => file.endsWith(".js"));
    
        for (const commandFile of commandFiles) {
            const command = require(`./interactions/slash/${module}/${commandFile}`);
            if (command.data) {
                collection.set(command.data.name, command);
            }
        }
    }

    return collection;
}


/**
 * @return {Collection<string, import('app/typings').AutocompleteInteraction>}
 * @description Todas as interações de autocomplete.
 */
function autoComplete() {
    
    /**********************************************************************/
    // Registro do Auto Completar
    
    /**
     * @type {String[]}
     * @description All autocomplete interactions.
    */

    const autocompleteInteractions = fs.readdirSync("./interactions/autocomplete");
    const collection = new Collection();

    // Loop through all files and store autocomplete interactions in autocompleteInteractions collection.

    for (const module of autocompleteInteractions) {
        const files = fs
            .readdirSync(`./interactions/autocomplete/${module}`)
            .filter((file) => file.endsWith(".js"));

        for (const interactionFile of files) {
            const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
            collection.set(interaction.name, interaction);
        }
    }

    return collection;
}


/**
 * @return {Collection<string, import('app/typings').ContextInteractionCommand>}
 * @description Todas as interações de context menu.
 */
function contextMenus() {
    /**********************************************************************/
    // Registration of Context-Menu Interactions

    /**
     * @type {String[]}
     * @description All Context Menu commands.
     */

    const contextMenus = fs.readdirSync("./interactions/context-menus");
    const collection = new Collection();

    // Loop through all files and store context-menus in contextMenus collection.

    for (const folder of contextMenus) {
        const files = fs
            .readdirSync(`./interactions/context-menus/${folder}`)
            .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const menu = require(`./interactions/context-menus/${folder}/${file}`);
            const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
            collection.set(keyName, menu);
        }
    }

    return collection;
}


/**
 * @return {Collection<string, import('app/typings').ButtonInteractionCommand>}
 * @description Todas as interações de botões.
 */
function buttonCommands() {
    /**********************************************************************/
    // Registration of Button-Command Interactions.

    /**
     * @type {String[]}
     * @description All button commands.
     */

    const buttonCommands = fs.readdirSync("./interactions/buttons");
    const collection = new Collection();

    // Loop through all files and store button-commands in buttonCommands collection.

    for (const module of buttonCommands) {
        const commandFiles = fs
            .readdirSync(`./interactions/buttons/${module}`)
            .filter((file) => file.endsWith(".js"));

        for (const commandFile of commandFiles) {
            const command = require(`./interactions/buttons/${module}/${commandFile}`);
            collection.set(command.id, command);
        }
    }

    return collection;
}


/**
 * @return {Collection<string, import('app/typings').ModalInteractionCommand>}
 * @description Todas as interações de modals.
 */
function modalCommands() {
    /**********************************************************************/
    // Registration of Modal-Command Interactions.

    /**
     * @type {String[]}
     * @description All modal commands.
     */

    const modalCommands = fs.readdirSync("./interactions/modals");
    const collection = new Collection();

    // Loop through all files and store modal-commands in modalCommands collection.

    for (const module of modalCommands) {
        const commandFiles = fs
            .readdirSync(`./interactions/modals/${module}`)
            .filter((file) => file.endsWith(".js"));

        for (const commandFile of commandFiles) {
            const command = require(`./interactions/modals/${module}/${commandFile}`);
            collection.set(command.id, command);
        }
    }

    return collection;
}

/**
 * @return {Collection<string, import('app/typings').SelectInteractionCommand>}
 * @description Todas as interações de select menus.
 */
function selectMenus() {
    /**********************************************************************/
    // Registration of select-menus Interactions

    /**
     * @type {String[]}
     * @description All Select Menu commands.
     */

    const selectMenus = fs.readdirSync("./interactions/select-menus");
    const collection = new Collection();

    // Loop through all files and store select-menus in selectMenus collection.

    for (const module of selectMenus) {
        const commandFiles = fs
            .readdirSync(`./interactions/select-menus/${module}`)
            .filter((file) => file.endsWith(".js"));
        for (const commandFile of commandFiles) {
            const command = require(`./interactions/select-menus/${module}/${commandFile}`);
            if (typeof command.id === "string") {
                collection.set(command.id, command);
                continue;
            }

            for (const id of command.id) {
                const newCommand = Object.assign({}, command);
                newCommand.id = id;
                collection.set(id, newCommand);
            }
        }
    }

    return collection;
}

module.exports = {
    slashCommands,
    autoComplete,
    contextMenus,
    buttonCommands,
    modalCommands,
    selectMenus
}