/**
 * @type {import('app/typings').SelectInteractionCommand}
 */
module.exports = {
	id: "config_role",

	async execute(interaction) {
		return await interaction.reply({
			content: "This was a reply from select menu handler!",
		});
		return;
	},
};
