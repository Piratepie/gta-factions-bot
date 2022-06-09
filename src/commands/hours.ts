import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { connectToGameCP, getActivity } from "../connectionGameCP";
export default {
	category: "Player",
	description: "Get player hours",
	slash: true,
	testOnly: false,
	guildOnly: true,
	expectedArgs: "<steamID>",
	minArgs: 1,
	maxArgs: 1,
	cooldown: "1h",

	callback: async ({ interaction, args, channel }) => {
		if (channel.name !== "bot-commands") {
			interaction.reply(
				"This command can only be used in the bot-commands channel!"
			);
			return;
		}

		const user = process.env.GAMECPUSER!;
		const pass = process.env.GAMECPPASS!;

		const loginSuccess = await connectToGameCP(user, pass);

		if (!loginSuccess) {
			return `Error 001: Login failed, please contact management.`;
		}

		await interaction.deferReply();

		const steamID = args[0];
		const activity = await getActivity(steamID);

		const activitySlim = {
			name: "N/A",
			minutesRebel: 0,
			minutesPolice: 0,
			minutesNHS: 0,
			minutesHATO: 0,
			minutesCTRG: 0,
			minutesRebelavg: 0,
			minutesPoliceavg: 0,
			minutesNHSavg: 0,
			minutesHATOavg: 0,
			minutesCTRGavg: 0,
		};

		try {
			activitySlim.name = activity.data[0].player;
			activitySlim.minutesRebel = Math.floor(activity.total.CIV / 60);
			activitySlim.minutesPolice = Math.floor(activity.total.Police / 60);
			activitySlim.minutesNHS = Math.floor(activity.total.NHS / 60);
			activitySlim.minutesHATO = Math.floor(activity.total.HATO / 60);
			activitySlim.minutesCTRG = Math.floor(activity.total.CTRG / 60);
			activitySlim.minutesRebelavg = Math.floor(activity.average.CIV / 60);
			activitySlim.minutesPoliceavg = Math.floor(activity.average.Police / 60);
			activitySlim.minutesNHSavg = Math.floor(activity.average.NHS / 60);
			activitySlim.minutesHATOavg = Math.floor(activity.average.HATO / 60);
			activitySlim.minutesCTRGavg = Math.floor(activity.average.CTRG / 60);
		} catch (e) {
			activitySlim.name = "N/A";
			activitySlim.minutesRebel = 0;
			activitySlim.minutesPolice = 0;
			activitySlim.minutesNHS = 0;
			activitySlim.minutesHATO = 0;
			activitySlim.minutesCTRG = 0;
			activitySlim.minutesRebelavg = 0;
			activitySlim.minutesPoliceavg = 0;
			activitySlim.minutesNHSavg = 0;
			activitySlim.minutesHATOavg = 0;
			activitySlim.minutesCTRGavg = 0;
		}

		const embed = new MessageEmbed()
			.setColor("#CD201F")
			.setTitle(`${activitySlim.name}'s activity`)
			.setAuthor({
				name: "PiratePie",
				iconURL: "https://i.imgur.com/qCx15ph.png",
				url: "https://grandtheftarma.com/profile/39618-piratepie/",
			})
			.addField(
				"🔫 Rebel",
				"Hours total: " +
					String(activitySlim.minutesRebel) +
					" | Average minutes: " +
					String(activitySlim.minutesRebelavg),
				false
			)
			.addField(
				"👮 APC",
				"Hours total: " +
					String(activitySlim.minutesPolice) +
					" | Average minutes: " +
					String(activitySlim.minutesPoliceavg),
				false
			)
			.addField(
				"👬 CTRG",
				"Hours total: " +
					String(activitySlim.minutesCTRG) +
					" | Average minutes: " +
					String(activitySlim.minutesCTRGavg),
				false
			)
			.addField(
				"👨‍⚕️ NHS",
				"Hours total: " +
					String(activitySlim.minutesNHS) +
					" | Average minutes: " +
					String(activitySlim.minutesNHSavg),
				false
			)
			.addField(
				"👷 HATO",
				"Hours total: " +
					String(activitySlim.minutesHATO) +
					" | Average minutes: " +
					String(activitySlim.minutesHATOavg),
				true
			)
			.setTimestamp();

		interaction.editReply({
			embeds: [embed],
		});
	},
} as ICommand;
