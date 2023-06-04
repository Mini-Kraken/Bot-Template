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

const { logMessage } = require("app/shared/scripts/webhook_log.js");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('app/typings').CommandInteraction} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		
		const { client } = interaction;
		

		// Checks if the interaction is a command (to prevent weird bugs)
		//console.log(interaction.guildId)

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
			content: `> Comando: \`${interaction.commandName + subcommand}\`
			> Usuário: \`${interaction.user.tag ?? "Não Encontrado"}\` (\`${interaction.user.id ?? "Não Encontrado"}\`)
			> Idioma do Usuario : \`${interaction.locale ?? "Não Encontrado"}\`
			${server ?? "404"}
			`
		}
		logMessage("geral", msg.content);
		const command = client.slashCommands.get(interaction.commandName);

		// Caso a interação não esteja no cache
		if (!command) throw `O comando /${interaction.commandName} não existe!`;

		//Tenta executar o slash
		return await command.execute(interaction);
	},
};
