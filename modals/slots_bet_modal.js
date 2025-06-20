const { slotsCommand } = require('../src/slots.js');
const { buildEmbed } = require('../commands/slots.js')

module.exports = {
	customId: 'slots_bet_modal',
	async execute(interaction) {
		const bet = parseInt(interaction.fields.getTextInputValue('bet_amount'));
		if (isNaN(bet) || bet < 10) {
			await interaction.reply({
				content: '❌ Invalid bet amount. Please enter a number ≥ 10.',
				ephemeral: true
			});
		}
		await interaction.update(buildEmbed(interaction, slotsCommand(interaction.user.id, bet)))

	}
}
