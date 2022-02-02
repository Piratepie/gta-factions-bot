const { Client, Intents } = require("discord.js");
const {token} = require("../config.json")

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

client.on("ready", () => {
	console.log("Bot is ready");
});

client.login(token);
