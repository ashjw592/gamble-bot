const { buildEmbed } = require('../commands/slots')
const { slotsCommand } = require('../src/slots.js')

module.exports = {
	customId: /^slots_play_again_\d+$/,
	async execute(interaction) {
		const parts = interaction.customId.split('_'); // ['slots', 'play', 'again', 'number']
		const bet = parseInt(parts[3]);
		userId = interaction.user.id
		await interaction.update(buildEmbed(interaction, slotsCommand(userId, bet), bet)
		);
	}
};
