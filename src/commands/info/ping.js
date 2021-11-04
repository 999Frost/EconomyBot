const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Renvoie la latence du bot.',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`Recherche...`)
        const embed = new MessageEmbed()
            .setDescription(`APi : ${client.ws.ping} ms\nBot : ${Math.floor(msg.createdAt - message.createdAt)} ms`)
            await message.channel.send(embed)
            msg.delete()

    }
}