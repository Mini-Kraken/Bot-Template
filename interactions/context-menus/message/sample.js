/**
 * @file Sample Message Context Menu interaction
 * @author Krish Garg
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('app/typings').ContextInteractionCommand}
 */
module.exports = {
	data: {
		name: "sample",
		type: 3, // 3 is for message context menus
	},

	async execute(interaction) {
		return await interaction.reply({
			content: "I am a sample message context menu.",
		});
		return;
	},
};
