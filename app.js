require('dotenv').config();
const { createDeck } = require('./src/blackjack.js')
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '❌ There was an error!', ephemeral: true });
	}
});
const path = require('path');
const buttons = new Map();

// Load buttons dynamically
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	buttons.set(button.customId, button);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	// Try to match a button module by regex
	for (const button of buttons.values()) {
		const match =
			typeof button.customId === 'string'
				? button.customId === interaction.customId
				: button.customId instanceof RegExp && button.customId.test(interaction.customId);

		if (match) {
			try {
				await button.execute(interaction);
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: 'There was an error with that button.',
					ephemeral: true
				});
			}
			break;
		}
	}
});

client.login(process.env.TOKEN);
