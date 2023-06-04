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

module.exports = {
	name: "interactionCreate",


	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('app/typings').AutocompleteInteractionValue} interaction The interaction which was created
	 */
	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is an autocomplete interaction (to prevent weird bugs)

		if (!interaction.isAutocomplete()) return;

		// Checks if the request is available in our code.

		const request = client.autocompleteInteractions.get(
			interaction.commandName
		);

		// If the interaction is not a request in cache return.
		if (!request) throw `O autocomplete de ${interaction.commandName} não existe!`;

		// Executa a interação de autocomplete
		return await request.execute(interaction);
	},
};
