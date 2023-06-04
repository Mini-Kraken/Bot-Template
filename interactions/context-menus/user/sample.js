
/**
 * @type {import('app/typings').ContextInteractionCommand}
 */
module.exports = {
	data: {
		name: "sample",
		type: 2, // 2 is for user context menus
	},

	async execute(interaction) {
		return await interaction.reply({
			content: "I am a sample user context menu.",
		});
		return;
	},
};
