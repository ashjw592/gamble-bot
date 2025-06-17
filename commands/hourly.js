const { SlashCommandBuilder } = require('discord.js');
const { hourlyCommand } = require('../src/hourly.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hourly')
		.setDescription('Your hourly allowance.'),
	async execute(interaction) {
		await interaction.reply(hourlyCommand(interaction.user.id))
	}
};
