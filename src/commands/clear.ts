import { ICommand } from "wokcommands";

export default {
	category: "Management",
	description: "Clears x amount of messages",
	slash: true,
	testOnly: false,

	permissions: ["ADMINISTRATOR"],

	maxArgs: 1,
	expectedArgs: "[amount]",

	callback: async ({ interaction, channel, args }) => {
		const amount = args.length ? parseInt(args.shift()!) : 10;
		const { size } = await channel.bulkDelete(amount, true);
		const response = interaction.reply({
			content: `${size} message(s) were deleted`,
			ephemeral: true,
		});
	},
} as ICommand;
