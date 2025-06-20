const { slotsCommand } = require('../src/slots.js')
const { getBalance } = require('../src/balance.js')
const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle
} = require('discord.js');

function buildEmbed(interaction, slotsResult) {
	if (typeof slotsResult === 'string') {
		return `${slotsResult}`
	}
	userId = interaction.user.id
	username = interaction.user.username
	emojiArr = slotsResult.emojiArr

	color = slotsResult.resultBit ?
		'#00ff00'
		: '#ff0000'
	const embed = new EmbedBuilder()
		.setTitle(`${username}'s Slot Machine`)
		.setColor(color)
		// .setThumbnail('https://example.com/icon.png')
		.setDescription(`**Balance** ${getBalance(userId)} \n ** Winnings:** ${slotsResult.winnings}\n ** Net:** ${slotsResult.winnings - slotsResult.bet}`)
		.addFields(
			{
				name: 'Slots',
				value: `${emojiArr[0]}${emojiArr[1]}${emojiArr[2]}\n${slotsResult.resultString}`,
				inline: false
			},
		);

	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(`slots_play_again_${slotsResult.bet}`)
			.setLabel(`Play Again(${slotsResult.bet})`)
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
		await interaction.reply(buildEmbed(interaction, slotsCommand(userId, bet)));

	},
	buildEmbed
};
