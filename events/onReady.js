/** $$\      $$\ $$\           $$\       $$\   $$\                    $$\                           
 *  $$$\    $$$ |\__|          \__|      $$ | $$  |                   $$ |                          
 *  $$$$\  $$$$ |$$\ $$$$$$$\  $$\       $$ |$$  /  $$$$$$\  $$$$$$\  $$ |  $$\  $$$$$$\  $$$$$$$\  
 *  $$\$$\$$ $$ |$$ |$$  __$$\ $$ |      $$$$$  /  $$  __$$\ \____$$\ $$ | $$  |$$  __$$\ $$  __$$\ 
 *  $$ \$$$  $$ |$$ |$$ |  $$ |$$ |      $$  $$<   $$ |  \__|$$$$$$$ |$$$$$$  / $$$$$$$$ |$$ |  $$ |
 *  $$ |\$  /$$ |$$ |$$ |  $$ |$$ |      $$ |\$$\  $$ |     $$  __$$ |$$  _$$<  $$   ____|$$ |  $$ |
 *  $$ | \_/ $$ |$$ |$$ |  $$ |$$ |      $$ | \$$\ $$ |     \$$$$$$$ |$$ | \$$\ \$$$$$$$\ $$ |  $$ |
 *  \__|     \__|\__|\__|  \__|\__|      \__|  \__|\__|      \_______|\__|  \__| \_______|\__|  \__|
 *  @version 3.0.0
 *  @author Quir & Rinne
 *  @see minikraken.tk
 */

const { EmbedBuilder, ActivityType, ActivityOptions } = require("discord.js");
const { logEmbedMessage } = require("app/shared/scripts/webhook_log");
module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('app/typings').Client} client Main Application Client.
	 */
	execute(client) {
		console.log("Bot iniciado com sucesso!");
	},


};
