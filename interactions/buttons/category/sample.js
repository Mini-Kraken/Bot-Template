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
