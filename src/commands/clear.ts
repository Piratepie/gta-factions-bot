import { ICommand } from "wokcommands";

export default {
	category: "chat",
	description: "Clears x amount of messages",
	slash: true,
	testOnly: true,

	permissions: ["ADMINISTRATOR"],

	maxArgs: 1,
	expectedArgs: "[amount]",

	callback: ({ message, interaction, channel, args }) => {
		const amount = args.length ? parseInt(args.shift()!) : 10;

		return "clear messages";
	},
} as ICommand;
