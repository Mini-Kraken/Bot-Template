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

// Este é o arquivo de Inicialização do Bot

//**************************************
// Importação dos dados
//**************************************
const fs = require("fs");
const path = require("path");

const symlinkPath = path.resolve("node_modules/app")

//Se o link simbólico ainda não existir, cria-o.
if (!fs.existsSync(symlinkPath)) {
    fs.symlinkSync(path.resolve(""), symlinkPath, "dir");
}

const { ShardingManager } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { beta, token, token_beta, client_id, client_id_beta, test_guild_id} = require("app/config.json");
const login_token = beta ? token_beta : token;
const login_client_id = beta ? client_id_beta : client_id;
const { terminal_color } = require("app/global.json");
const readInteractions = require("app/read_interactions.js");


//Mensagem de Inicialização
console.log(terminal_color.mk+" ____    ____   _             _    ___  ____                  __                      "+terminal_color.reset);
console.log(terminal_color.mk+"|_   \\  /   _| (_)           (_)  |_  ||_  _|                [  |  _                 "+terminal_color.reset);
console.log(terminal_color.mk+"  |   \\/   |   __   _ .--.   __     | |_/ /    _ .--.  ,--.   | | / ] .---.  _ .--.   "+terminal_color.reset);
console.log(terminal_color.mk+"  | |\\  /| |  [  | [ `.-. | [  |    |  __'.   [ `/'`\\]`'_\\ :  | '' < / /__\\\\[ `.-. |  "+terminal_color.reset);
console.log(terminal_color.mk+" _| |_\\/_| |_  | |  | | | |  | |   _| |  \\ \\_  | |    // | |, | |`\\ \\| \\__., | | | |  "+terminal_color.reset);
console.log(terminal_color.mk+"|_____||_____|[___][___||__][___] |____||____|[___]   \\';__/ [__|  \\_]'.__.'[___||__] "+terminal_color.reset);
console.log(terminal_color.mk+"                                                                                      "+terminal_color.reset);
console.log(`${terminal_color.bg} Sistema ${terminal_color.waiting} Inicializando shards...${terminal_color.reset} `)


const manager = new ShardingManager('./bot.js', {
    token: login_token,
    totalShards: 1, // Número de Shards Desejados (Recomendado: 'auto')
    respawn: true
});

manager.on('shardCreate', async (shard) => {
    console.log(`${terminal_color.bg} Shard ${shard.id} ${terminal_color.waiting} Iniciando... ${terminal_color.reset} `);
});

manager.spawn({
    timeout: 60000,
});


/**********************************************************************/
// Registration of Slash-Commands in Discord API

const rest = new REST({ version: "10" }).setToken(login_token);
const slashes = Array.from(readInteractions.slashCommands().values());
const contexts = Array.from(readInteractions.contextMenus().values());
const commandJsonData = [
	...slashes.map(c => c.data.toJSON()),
	...contexts.map(c => c.data),
];

const restGlobal = new REST({ version: "10" }).setToken(token);
const localOnlyCommandJsonData = [
	...slashes.filter(c => c.local).map(c => c.data.toJSON()),
	...contexts.filter(c => c.local).map(c => c.data),
];

(async () => {
	try {
        // Envia para a API do Discord os comandos locais (os globais devem ser alterados pelo update_commands.js)
		await rest.put(
			Routes.applicationGuildCommands(login_client_id, test_guild_id),
			{ body: commandJsonData }
		);


        console.log(`${terminal_color.bg} Sistema ${terminal_color.online} Comandos Atualizados Localmente! ${terminal_color.reset} `);

	} catch (error) {
		console.error(error);
	}
})();

//Sistema Anti Crash
process.on("uncaughtException", (err) => {
	console.log(`${terminal_color.bg} Anti-Crash Global ${terminal_color.reset}\n${err}`)
});

process.on("unhandledRejection", (reason, promise) => {
    console.log(`${terminal_color.bg} Anti-Crash Global ${terminal_color.reset}\nPromise:\n${promise.toString()}\nMotivo:\n${reason.message}`)
});