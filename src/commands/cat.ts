import { ICommand } from "wokcommands";

export default {
	category: "Cat",
	description: "Cat",
	slash: true,
	testOnly: false,
	cooldown: "1m",

	callback: async () => {
		const linkArray: string[] = [
			"https://cataas.com/cat",
		];
		const randomElement =
			linkArray[Math.floor(Math.random() * linkArray.length)];
		return randomElement;
	},
} as ICommand;
