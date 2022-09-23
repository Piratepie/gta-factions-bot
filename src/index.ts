import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import WOKCommands from "wokcommands";
import path from "path";
dotenv.config();

const client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.on("ready", () => {
	console.log("Bot is ready!");

	new WOKCommands(client, {
		commandsDir: path.join(__dirname, "commands"),
		typeScript: true,
		testServers: "",
		botOwners: ["90824609535889408"],
		mongoUri: process.env.MONGO_URI,
	}).setCategorySettings([
		{ name: "Management", emoji: "👔", hidden: true },
		{ name: "Utils", emoji: "⚙️" },
	]);
});

client.login(process.env.TOKEN);
