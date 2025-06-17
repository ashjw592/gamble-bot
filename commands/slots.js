const { SlashCommandBuilder } = require('discord.js');
const { slotsCommand } = require('../src/slots.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slots')
		.setDescription('Gamble in a slot machine.')
		.addNumberOption(option =>
			option.setName('bet')
				.setDescription('Amount to bet')
				.setMinValue(10)
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply(slotsCommand(interaction.user.id, interaction.options.getNumber('bet')));

	},
};
