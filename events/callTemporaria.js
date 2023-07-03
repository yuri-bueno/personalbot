
// const client = require("../index")
// const Discord = require("discord.js")

// client.on("voiceStateUpdate", async (oldState, newState) => {

//     try {
//         const usuario = newState.guild.members.cache.get(newState);
//         const canal = newState.guild.channels.cache.get("1109046100972814437")

//         if (newState.channel?.id == canal.id) {
//             let channel = await newState.guild.channels.create({
//                 name: 'soloQueue',
//                 parent: newState.channel.parentId,
//                 type: Discord.ChannelType.GuildVoice,
//                 userLimit: 2,
//                 permissionOverwrites: [{
//                     id: newState.id,
//                     null: [],
//                     allow: "ManageChannels"
//                 }]
//             }).then(usuario => newState.setChannel(usuario.id))
//         }





//         console.log(oldState.channel?.members.size);
//         if (oldState.channel?.parentId === canal.parentId && oldState.channel?.id !== canal.id) {

//             if (!oldState.channel.members.size) {
//                 await oldState.channel.delete();
//             }

//         }


//     } catch (error) {
//         console.log('erro call deletada');
//     }
// })