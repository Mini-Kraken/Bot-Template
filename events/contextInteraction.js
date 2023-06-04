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

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('app/typings').ContextMenuCommandInteraction} interaction The interaction which was created
	 */

	execute: async (interaction) => {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a context interaction (to prevent weird bugs)
		if (!interaction.isContextMenuCommand()) return;

		/**********************************************************************/

		// Checks if the interaction target was a user
		const prefix = interaction.isUserContextMenuCommand() ? "USER " : "MESSAGE ";
		const interactionName = prefix + interaction.commandName
		const command = client.contextCommands.get(interactionName);

		if (!command) throw `O context menu ${interactionName} não existe!`;

		// Executa o context menu
		return await command.execute(interaction);
	},
};
