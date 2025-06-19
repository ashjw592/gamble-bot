const { slotsCommand } = require('../src/slots.js')
const { getBalance } = require('../src/balance.js')
const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle
} = require('discord.js');

function buildEmbed(interaction, slotsResult, bet) {
	userId = interaction.user.id
	username = interaction.user.username
	const embed = new EmbedBuilder()
		.setTitle(`${username}'s Slot Machine`)
		// .setColor('#FFD700') // gold/yellow
		// .setThumbnail('https://example.com/your-card-icon.png') // optional
		.setDescription(`**Balance** ${getBalance(userId)} \n ** Winnings:** ⏣ 10,000\n ** Net:** ⏣ +5,000`)
		.addFields(
			{
				name: 'Slots',
				value: `${slotsResult} `,
				inline: false
			},
		);

	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(`slots_play_again_${bet}`)
			.setLabel(`Play Again(${bet})`)
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setCustomId('slots_play_again_new')
			.setLabel('Play Again (New Bet)')
			.setStyle(ButtonStyle.Primary),
	);
	return {
		embeds: [embed],
		components: [row]
	}

}

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
		userId = interaction.user.id
		bet = interaction.options.getNumber('bet')
		await interaction.reply(buildEmbed(interaction, slotsCommand(userId, bet), bet));

	},
	buildEmbed
};
