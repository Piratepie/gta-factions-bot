import { ICommand } from "wokcommands";

export default {
	category: "Management",
	description: "Updates hours for a given faction!",
	slash: true,
	testOnly: false,

	callback: ({ interaction }) => {
		return "pong";
	},
} as ICommand;
