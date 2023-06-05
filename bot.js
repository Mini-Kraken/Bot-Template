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
const {
	Client,
	GatewayIntentBits,
	Partials,
	Options
} = require("discord.js");

const {terminal_color} = require("app/global.json");
const {depuration, bugMessage} = require("app/base/debug");
const {beta, token, token_beta } = require("app/config.json");
const Cache = require("app/base/cache");
const intercept = require("intercept-stdout");
const login_token = beta ? token_beta : token;
const readInteractions = require("app/read_interactions.js");
//Sistema Anti Crash
process.on("uncaughtException", (err) => {
	console.log(`${terminal_color.bg} Anti-Crash ${terminal_color.reset} `)
	console.log("Erro:")
	console.log(err)
});
process.on("unhandledRejection", (reason, promise) => {
	console.log(`${terminal_color.bg} Anti-Crash ${terminal_color.reset}`);
	console.log("Promise:");
	console.log(promise);
	console.log("Motivo:")
	console.log(reason.message);
});

/**
 * From v13, specifying the intents is compulsory.
 * @description Cliente do shard atual 
 * @type {import('app/typings').Client}
 */
const client = new Client({
	//coloque aqui os intents conforme necessário
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	],
	//Cache Personalizado
	partials: [Partials.Channel],
	makeCache: Options.cacheWithLimits({
		...Options.DefaultMakeCacheSettings,
		MessageManager: 0,
		ReactionManager: 0,
	})
});

const unhookIntercept = intercept(function(txt) {
	if (client.shard.id === undefined) {
		return txt;
	}
    return `${terminal_color.bg} Shard ${client.shard.id} ${terminal_color.reset} ${txt}`
});

/**********************************************************************/

// Below we will be making an event handler!

/**
 * @description All event files of the event handler.
 * @type {String[]}
 */

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

// Loop through all files and execute the event when it is actually emmited.
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
		continue;
	}
	
	client.on(
		event.name,
		async(...args) => {
			try {
				return await event.execute(...args, client);
			} catch (err) {
				const interaction = args.filter(arg => arg.reply && arg.isChatInputCommand)[0];
				if (!interaction) {
					return;
				}
				
				depuration(interaction, err);
				return await interaction.reply({
					embeds: [bugMessage(interaction,err)],
					ephemeral: true
				});
			}
		}
	);
}

/**********************************************************************/
// Define as Coleções de Comandos, Comandos Slash
client.slashCommands = readInteractions.slashCommands();
client.buttonCommands = readInteractions.buttonCommands();
client.selectCommands = readInteractions.selectMenus();
client.contextCommands = readInteractions.contextMenus();
client.modalCommands = readInteractions.modalCommands();
client.autocompleteInteractions = readInteractions.autoComplete();

/**********************************************************************/
// Define as configurações do cache customizado
client.cache = {};
/**********************************************************************/
// Logar no Cliente do discord
client.login(login_token);
/**********************************************************************/
//Notificações dos Shards 

//Notificar Quando o Shard Ligou
client.on("shardReady", async shard => {
	console.log(`${terminal_color.bg} Shard ${shard} ${terminal_color.online} Iniciado com sucesso! ${terminal_color.reset} `)
	client.shard.id = shard;
});

//Notificar quando o Shard Caiu
client.on("shardDisconnect", async shard => {
	console.log(`${terminal_color.fail} Está fora do Ar! ${terminal_color.reset} `)
});

client.on("shardReconnecting", async shard => {
	console.log(`${terminal_color.waiting} Reconectando... ${terminal_color.reset} `)
});

client.on("shardResume", async shard => {
	console.log(`${terminal_color.online} Reconectado! ${terminal_color.reset} `)
});
