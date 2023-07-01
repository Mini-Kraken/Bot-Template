//$$\      $$\ $$\           $$\       $$\   $$\                    $$\                           
//$$$\    $$$ |\__|          \__|      $$ | $$  |                   $$ |                          
//$$$$\  $$$$ |$$\ $$$$$$$\  $$\       $$ |$$  /  $$$$$$\  $$$$$$\  $$ |  $$\  $$$$$$\  $$$$$$$\  
//$$\$$\$$ $$ |$$ |$$  __$$\ $$ |      $$$$$  /  $$  __$$\ \____$$\ $$ | $$  |$$  __$$\ $$  __$$\ 
//$$ \$$$  $$ |$$ |$$ |  $$ |$$ |      $$  $$<   $$ |  \__|$$$$$$$ |$$$$$$  / $$$$$$$$ |$$ |  $$ |
//$$ |\$  /$$ |$$ |$$ |  $$ |$$ |      $$ |\$$\  $$ |     $$  __$$ |$$  _$$<  $$   ____|$$ |  $$ |
//$$ | \_/ $$ |$$ |$$ |  $$ |$$ |      $$ | \$$\ $$ |     \$$$$$$$ |$$ | \$$\ \$$$$$$$\ $$ |  $$ |
//\__|     \__|\__|\__|  \__|\__|      \__|  \__|\__|      \_______|\__|  \__| \_______|\__|  \__|
// Versão 3.0.0
//@aut Desenvolvido por: Quir & Rinne
// minikraken.tk

const config = require("app/global.json");
const { EmbedBuilder } = require("discord.js");
const translations = require("app/base/error_translation.json");
const { logMessage } = require("app/shared/scripts/webhook_log.js");


function bugMessage(interaction, err) {
    /**
     * @type {typeof translations.default}
     */
    const translation = translations[interaction.locale] ?? translations.default
    embed = new EmbedBuilder()
    .setTitle(translation.title)
    .setColor(config.cores.crimson)
    .setDescription(translation.desc)
    .setFields([{
        name: translation.field_name,
        value: translation.field_value,
        inline: false,
    }])
    .setThumbnail("https://rpg.arkanus.app/img/icons/chorando.png")
    return embed
}
/**
 * @param {import("discord.js").Interaction} interaction 
 * @param {Error} err 
 * @returns {void}
 */
function depuration(interaction, err) {
    if (interaction.isChatInputCommand()) {
        return depurationSlash(interaction, err);
    }
    return depurationComponent(interaction, err);
}

//* Slash command type = 1
/**
 * @param {import("discord.js").Interaction} interaction 
 * @param {Error} err 
 * @returns {void}
 */
function depurationSlash(interaction, err) {
    if (!interaction.guild) {
        server = `> DM: \`DM\` (\`${interaction.channelId}\`)`
    } else {
        server = `> Servidor: \`${interaction.guild.name ?? "Não Encontrado"}\` (\`${interaction.guild.id ?? "Não Encontrado"}\`)`
    }


    if (!interaction.isChatInputCommand()) return;
    
    //* Sistema de Log 
    let subcommand = ""
    try {
        subcommand = " "+interaction.options.getSubcommand()
    }
    catch {}
    const msg = {
        content: `@everyone
        **BUG** | Shard: \`${interaction.client.shard.id}\`
        > Comando: \`${interaction.commandName + subcommand}\`
        > Usuário: \`${interaction.user.tag ?? "Não Encontrado"}\` (\`${interaction.user.id ?? "Não Encontrado"}\`)
        > Idioma do Usuario : \`${interaction.locale ?? "Não Encontrado"}\`
        ${server ?? "404"}
        \`\`\`js
        ${err.stack}
        \`\`\`
        `
    }
    
    logMessage("bug", msg.content);
}

/**
 * @param {import("discord.js").Interaction} interaction 
 * @param {Error} err 
 * @returns {void}
 */
function depurationComponent(interaction, err){
    if (interaction.guild == null) {
        server = `> DM: \`DM\` (\`${interaction.channelId}\`)`
    } else {
        server = `> Servidor: \`${interaction.guild.name ?? "Não Encontrado"}\` (\`${interaction.guild.id ?? "Não Encontrado"}\`)`
    }
    const msg = {
        content: `@everyone
        **BUG - Componente** | Shard: \`${interaction.client.shard.id}\`
        > Comando: \`${interaction.customId}\`
        > Usuário: \`${interaction.user.tag ?? "Não Encontrado"}\` (\`${interaction.user.id ?? "Não Encontrado"}\`)
        > Idioma do Usuario : \`${interaction.locale ?? "Não Encontrado"}\`
        ${server ?? "404"}
        \`\`\`js
        ${err.stack}
        \`\`\`
        `
    }
    console.log(err.__proto__);
    
    logMessage("bug", msg.content);
}

module.exports = {
    bugMessage,
    depuration
}
