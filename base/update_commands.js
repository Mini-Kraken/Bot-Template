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

//Este é o arquivo de fragmentação do bot

//Estruturação de Cores do Terminal
//**************************************
// Importação dos dados
//**************************************
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { token, token_beta, client_id, client_id_beta } = require("app/config.json");
const readInteractions = require("app/read_interactions.js");

/**********************************************************************/
// Registration of Slash-Commands in Discord API

const restBotGlobal = new REST({ version: "10" }).setToken(token);
const restBotTestes = new REST({ version: "10" }).setToken(token_beta);

const commandJsonData = [
	...Array.from(readInteractions.slashCommands().values()).filter(c => !c.local).map(c => c.data.toJSON()),
	...Array.from(readInteractions.contextMenus().values()).filter(c => !c.local).map(c => c.data),
];

(async () => {
	try {
		console.log("[Slash-Commands] Iniciando upload dos (/) commands globais");
		/**
		 * Good advice for global commands, you need to execute them only once to update
		 * your commands to the Discord API. Please comment it again after running the bot once
		 * to ensure they don't get re-deployed on the next restart.
		 */

		await restBotGlobal.put(

			Routes.applicationCommands(client_id),

			{ body: commandJsonData }
		);
		
		await restBotTestes.put(
			Routes.applicationCommands(client_id_beta),

			{ body: commandJsonData }
		);

		console.log("[Slash-Commands] Upload dos (/) commands globais feito com sucesso.");
	} catch (error) {
		console.error(error);
	}
})();
