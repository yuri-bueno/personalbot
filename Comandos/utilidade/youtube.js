const Discord = require("discord.js");
//const ytdl = require("ytdl-core");

module.exports = {
  name: "play", // Coloque o nome do comando
  description: "Comando de musica", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "link",
      description: "seu nickname do lol",
      type: Discord.ApplicationCommandOptionType.String,
      require: true,
    },
  ],

  run: async (client, interaction) => {
    let link = interaction.options.getString("link");

    interaction.reply(`${link}`);

    if (interaction.member.voice.channel)
      return interaction.reply({
        content: "você precisa está em um canal de voz para funcionar!!",
      });
  },
};
