const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	name:"deposit",
	aliases:["dep"],
	description:"Permet de déposer de l'argent à la banque",

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */

	run : async(client, message, args) => {


let user = message.author;

        let member = db.fetch(`argent_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`argent_${user.id}`)

            let tmr = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription("Vous n'avez pas toute cette argent.")
                .setFooter('Mitsuki - Economy ©')

            if (!money) return message.channel.send(tmr)

            db.subtract(`argent_${user.id}`, money)
            db.add(`banque_${user.id}`, money)
            let rawe = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`Vous avez déposer toute votre argent à la banque`)
                .setFooter('Mitsuki - Economy ©')
            message.channel.send(rawe)

        } else {


            if (!args[0]) {
                return message.channel.send("Veuillez envoyer un nombre")
                    .catch(err => message.channel.send(err.message))
            }

            if(isNaN(args[0])) {
                return message.channel.send("Veuillez envoyer un nombre.")
            
            }
            let embed3 = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`Vous ne pouvez pas déposer moins que 0 coins`)
                .setFooter('Mitsuki - Economy ©')

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`Vous n'avez pas autant d'argent`)
                .setFooter('Mitsuki - Economy ©')

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`Vous avez déposé ${args[0]} coins dans votre banque`)
                .setFooter('Mitsuki - Economy ©')
            message.channel.send(embed5)
            db.subtract(`argent_${user.id}`, args[0])
            db.add(`banque_${user.id}`, args[0])

        }
    }
}