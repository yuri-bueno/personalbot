const Discord = require('discord.js')
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128, 7796] })

const dotenv = require('dotenv')
const { name } = require('./Comandos/utilidade/ping')

dotenv.config()

client.login(process.env.TOKEN_DISCORD)



client.on('interactionCreate', (interaction) => {



    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return interaction.reply(`Error`);

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction)

    }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.on("ready", () => {

    console.log(`${client.user.username} está online e metendo!!!`);
    //    connectToDatabase()

})

module.exports = client

const fs = require("fs")

fs.readdir("./events", (err, file) => {

    file.forEach(event => {
        require(`./events/${event}`)
    })
})