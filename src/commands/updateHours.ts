import { ICommand } from "wokcommands";
import "dotenv/config";
import { MessageEmbed } from "discord.js";
import {
	connectToGameCP,
	getHato,
	getMedics,
	getPolice,
	getActivity,
	getCtrg,
} from "../connectionGameCP";
import PlayerData from "../player-schema";

export default {
	category: "Management",
	description: "Updates hours for all factions!",
	slash: true,
	testOnly: false,
	guildOnly: true,
	globalCooldown: "30m",

	callback: async ({ interaction, guild }) => {
		let member = guild!.members.cache.get(interaction.user.id);
		let hasRole = member!.roles.cache.some(
			(role) => role.name === "ActivityManager"
		);

		if (!hasRole) {
			interaction.reply("You don't have the required role!");
			return;
		}

		const user = process.env.GAMECPUSER!;
		const pass = process.env.GAMECPPASS!;

		const loginSuccess = await connectToGameCP(user, pass);

		if (!loginSuccess) {
			return `Error 001: Login failed, please contact management.`;
		}

		await interaction.deferReply();

		const allPolice: {
			uid: string;
			name: string;
			last_logout: string;
			join_date: string;
			permission: string;
			admin_level: string;
			permission_level: number;
			rank: string;
			sfc: number;
			npas: number;
			rto: number;
		}[] = await getPolice();

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

		const allHato: {
			uid: string;
			name: string;
			last_logout: string;
			join_date: string;
			permission: string;
			admin_level: string;
			permission_level: number;
			rank: string;
		}[] = await getHato();

		const allCtrg: {
			uid: string;
			name: string;
			last_logout: string;
			join_date: string;
			permission: string;
			admin_level: string;
			permission_level: number;
			rank: string;
		}[] = await getCtrg();

		const allSteam: string[] = [];

		for (const ctrg of allCtrg) {
			allSteam.indexOf(ctrg.uid) === -1 ? allSteam.push(ctrg.uid) : null;
		}
		for (const officer of allPolice) {
			allSteam.indexOf(officer.uid) === -1 ? allSteam.push(officer.uid) : null;
		}

		for (const medic of allMedics) {
			allSteam.indexOf(medic.uid) === -1 ? allSteam.push(medic.uid) : null;
		}

		for (const hato of allHato) {
			allSteam.indexOf(hato.uid) === -1 ? allSteam.push(hato.uid) : null;
		}

		PlayerData.collection.drop();

		for (let i = 0; i < allSteam.length; i++) {
			const embed = new MessageEmbed()
				.setColor("#CD201F")
				.setTitle("Updating hours")
				.setAuthor({
					name: "PiratePie",
					iconURL: "https://i.imgur.com/qCx15ph.png",
					url: "https://grandtheftarma.com/profile/39618-piratepie/",
				})
				.setDescription(
					`Updating all factions hours: ${i + 1}/${allSteam.length}`
				)
				.setTimestamp();

			interaction.editReply({
				embeds: [embed],
			});
			let activity;
			try {
				activity = await getActivity(allSteam[i]);
			} catch (e) {
				const embedError = new MessageEmbed()
					.setColor("#CD201F")
					.setTitle("Error")
					.setDescription(
						"Error 002: GameCP flood protection, please try again in 5 minutes."
					);
				interaction.editReply({
					embeds: [embedError],
				});
				return;
			}
			const activitySlim = {
				uid: allSteam[i],
				minutesRebel: activity.total.CIV,
				minutesAPC: activity.total.Police,
				minutesNHS: activity.total.NHS,
				minutesHato: activity.total.HATO,
				minutesCtrg: activity.total.CTRG,
			};

			await new PlayerData(activitySlim).save();
			await new Promise((resolve) => setTimeout(resolve, 1200));
		}
	},
} as ICommand;
