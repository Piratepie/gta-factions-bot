import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { connectToGameCP, getMedics } from "../connectionGameCP";

export default {
	category: "testing",
	description: "Return how many people have medic whitelisting",
	slash: true,
	testOnly: true,
	expectedArgs: "<username> <password> <token>",
	minArgs: 3,
	maxArgs: 3,

	callback: async ({ args }) => {
		const username = args[0];
		const password = args[1];
		const token = args[2];

		await connectToGameCP(username, password, token);
		const number = await getMedics();

		const embed = new MessageEmbed()
			.setTitle("Medic numbers")
			.setDescription(`There are currently ${number.length} whitelisted medics`)
			.setColor("GREEN");

		return embed;
	},
} as ICommand;
