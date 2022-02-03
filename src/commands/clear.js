const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears x amount of messages from this chat")
        .addNumberOption((option) => {
            option
                .setName("messages")
                .setDescription("Number of messages")
                .setRequired(true)
        }),
    async execute(interaction) {
        interaction.reply({
            content: interaction.options.getNumber("messages"),
            ephemeral: true,
        });
    }
}