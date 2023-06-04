/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('app/typings').ButtonInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		return await interaction.reply({
			content: "This was a reply from button handler!",
		});
		return;
	},
};
