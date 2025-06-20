
const { buildEmbed } = require('../commands/slots')
const { slotsCommand } = require('../src/slots.js')

const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

function buildModal() {
	const modal = new ModalBuilder()
		.setCustomId('slots_bet_modal')
		.setTitle('Enter Your Bet');

	const betInput = new TextInputBuilder()
		.setCustomId('bet_amount')
		.setLabel('Bet Amount')
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('e.g. 500')
		.setRequired(true);

	const firstActionRow = new ActionRowBuilder().addComponents(betInput);
	modal.addComponents(firstActionRow);
	return modal
}

module.exports = {
	customId: 'slots_play_again_new',
	async execute(interaction) {
		await interaction.showModal(buildModal())
	}
};
