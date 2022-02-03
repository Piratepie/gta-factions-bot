import { ICommand } from "wokcommands";

export default {
	category: "testing",
	description: "Pong!",
	slash: true,
	testOnly: true,

	callback: ({ interaction }) => {
		return "pong";
	},
} as ICommand;
