import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

client.on("ready", () => {
	console.log("Bot is ready!");
});

client.login(process.env.TOKEN);