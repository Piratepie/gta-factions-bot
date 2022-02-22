import { channelMention } from "@discordjs/builders";
import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { updateHours } from "../connectionFirebase";
import { connectToGameCP, getMedics } from "../connectionGameCP";

export default {
	category: "Management",
	description: "Return how many people have medic whitelisting",
	slash: true,
	testOnly: true,
	expectedArgs: "<username> <password> <token>",
	minArgs: 3,
	maxArgs: 3,

	callback: async ({ interaction, args, channel }) => {
		const username = args[0];
		const password = args[1];
		const token = args[2];

		if (await connectToGameCP(username, password, token)) {
			const embed = new MessageEmbed()
				.setTitle("Login failed")
				.setDescription("Login failed lol try again");
			await interaction.reply({ embeds: [embed], ephemeral: true });
			return null;
		}
		const allMedics: {
			uid: string;
			name: string;
			last_logout: string;
			join_date: string;
			permission: string;
			admin_level: string;
			permission_level: number;
			rank: string;
		}[] = await getMedics();

		const embed = new MessageEmbed()
			.setTitle("Medic numbers")
			.setDescription(
				`There are currently ${allMedics.length} whitelisted medics.`
			)
			.setColor("GREEN");
		await await interaction.reply({ embeds: [embed], ephemeral: true });

		channel.send(
			//todo:make this nice embed
			`${interaction.user} just ran the xxx command, this command is on a 1 hour cooldown.`
		);

		// updateHours("Medics", allMedics);
		return null;
	},
} as ICommand;
