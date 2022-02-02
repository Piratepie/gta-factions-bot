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
	console.log("Bot is ready");

	const guildID = "938213449161388122";
	const guild = client.guilds.cache.get(guildID);
	let commands;

	if (guild) {
		commands = guild.commands;
	} else {
		commands = client.application?.commands;
	}

	commands?.create({
		name: "ping",
		description: "replies with pong",
	});

	commands?.create({
		name: "add",
		description: "Adds two numbers.",
		options: [
			{
				name: "num1",
				description: "Number 1",
				required: true,
				type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
			},
			{
				name: "num2",
				description: "Number 2",
				required: true,
				type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
			},
		],
	});
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

	switch (commandName) {
		case "ping":
			interaction.reply({
				content: "pong",
				ephemeral: true,
			});
			break;
		case "add":
			const num1 = options.getNumber("num1")!;
			const num2 = options.getNumber("num2")!;
			interaction.reply({
				content: `The sum is ${num1 + num2}`,
				ephemeral: true,
			});
	}
});

client.login(process.env.TOKEN);
