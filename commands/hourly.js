const { SlashCommandBuilder } = require('discord.js');
const { hourlyCommand } = require('../src/hourly.js')
const cooldowns = new Map(); // key: userId, value: timestamp
const COOLDOWN_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hourly')
		.setDescription('Your hourly allowance.'),
	async execute(interaction) {
		const userId = interaction.user.id;
		const now = Date.now();

		// Check if user is on cooldown
		if (cooldowns.has(userId)) {
			const lastUsed = cooldowns.get(userId);
			const timePassed = now - lastUsed;

			if (timePassed < COOLDOWN_TIME) {
				const remaining = Math.ceil((COOLDOWN_TIME - timePassed) / 1000);
				const minutes = Math.floor(remaining / 60);
				const seconds = remaining % 60;
				return interaction.reply({
					content: `⏳ You must wait ${minutes}m ${seconds}s before using this again.`,
					ephemeral: true
				});
			}
		}

		// Command logic here
		await interaction.reply(hourlyCommand(userId));

		// Set cooldown
		cooldowns.set(userId, now);
		//await interaction.reply(hourlyCommand(interaction.user.id))
	}
};
