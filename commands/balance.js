const { SlashCommandBuilder } = require('discord.js');
const { balanceCommand } = require('../src/balance.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Get your current balance.'),
	async execute(interaction) {
		await interaction.reply(balanceCommand(interaction.user.id))
	},
};
