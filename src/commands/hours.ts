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

		console.log(activity);

		const activitySlim = {
			minutesRebel: 0,
			minutesPolice: 0,
			minutesNHS: 0,
			minutesHATO: 0,
			minutesCTRG: 0,
		};

		try {
			activitySlim.minutesRebel = Math.floor(activity.total.CIV / 60);
			activitySlim.minutesPolice = Math.floor(activity.total.Police / 60);
			activitySlim.minutesNHS = Math.floor(activity.total.NHS / 60);
			activitySlim.minutesHATO = Math.floor(activity.total.HATO / 60);
			activitySlim.minutesCTRG = Math.floor(activity.total.CTRG / 60);
		} catch (e) {
			activitySlim.minutesRebel = 0;
			activitySlim.minutesPolice = 0;
			activitySlim.minutesNHS = 0;
			activitySlim.minutesHATO = 0;
			activitySlim.minutesCTRG = 0;
		}

		const embed = new MessageEmbed()
			.setColor("#CD201F")
			.setTitle("Updating hours")
			.setAuthor({
				name: "PiratePie",
				iconURL: "https://i.imgur.com/qCx15ph.png",
				url: "https://grandtheftarma.com/profile/39618-piratepie/",
			})
			.setDescription(`${steamID}'s hours played last 30 days.`)
			.addField("Rebel", String(activitySlim.minutesRebel), false)
			.addField("APC", String(activitySlim.minutesPolice), false)
			.addField("NHS", String(activitySlim.minutesNHS), false)
			.addField("HATO", String(activitySlim.minutesHATO), false)
			.addField("CTRG", String(activitySlim.minutesCTRG), false)
			.setTimestamp();

		interaction.editReply({
			embeds: [embed],
		});
	},
} as ICommand;
