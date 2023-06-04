/**
 * @type {import('app/typings').ModalInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		return await interaction.reply({
			content: "This was a reply from modal handler!",
		});
		return;
	},
};
