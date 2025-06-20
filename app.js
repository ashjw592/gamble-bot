require('dotenv').config();
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
const buttons = new Map();
const modals = new Map();

// Load buttons dynamically
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	buttons.set(button.customId, button);
}

const modalFiles = fs.readdirSync('./modals').filter(file => file.endsWith('.js'));
for (const file of modalFiles) {
	const modal = require(`./modals/${file}`);
	modals.set(modal.customId, modal);
}
client.on('interactionCreate', async interaction => {
	if (interaction.isButton()) {

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
	}
	if (interaction.isModalSubmit()) {
		for (const modal of modals.values()) {
			if (interaction.customId === modal.customId) {
				try {
					await modal.execute(interaction);
				}
				catch (err) {
					console.error(err);
					await interaction.reply({
						content: 'There was an error with that interaction',
						ephemeral: true
					})
				}
				break;
			}
		}


	}
});

client.login(process.env.TOKEN);
