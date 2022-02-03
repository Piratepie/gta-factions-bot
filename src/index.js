const { Client, Intents, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9")
const { token, production, guildId } = require("../config.json")
const fs = require("fs");
const path = require("path");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

const commandDir = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
};

client.on("ready", () => {
	console.log("Bot is ready");
	const CLIENT_ID = client.user.id;
	const rest = new REST({
		version: "9"
	}).setToken(token);

	(async () => {
		try {
			if (production) {
				await rest.put(Routes.applicationCommands(CLIENT_ID), {
					body: commands
				});
				console.log("commands registered globally")
			} else {
				await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
					body: commands
				});
				console.log("commands registered in dev server")
			}
		} catch (e) {
			console.log(`Something went wrong!`);
			console.error(e)
		}
	})();
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch {
		console.error(e);

		await interaction.reply({
			content: "An error occured",
			ephemeral: true,
		})
	}
})

client.login(token);
