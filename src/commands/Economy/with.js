const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	name:"withdraw",
	aliases:["wit", "with"],
	description:"Permet de récupérer de l'argent à la banque",

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */

	run : async(client, message, args) => {

        let user = message.author;

        let member2 = db.fetch(`banque_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`banque_${user.id}`)
            let embed = new MessageEmbed()
              .setColor('2F3136')
              .setDescription(`Vous n'avez pas d'argent à la banque`)
            if (!money) return message.channel.send(embed)
            db.subtract(`banque_${user.id}`, money)
            db.add(`argent_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor('2F3136')
                .setDescription(`Vous avez retiré toute l'argent de votre banque.`)
                .setFooter('Mitsuki - Economy ©')
            message.channel.send(embed5)

        } else {


            if (!args[0]) {
                return message.channel.send('Veuillez spécifier un nombre d\'argent a retirer.')
            }


            if(isNaN(args[0])) {
                return message.channel.send('Veuillez spécifier un nombre valide.')
            }

            if (message.content.includes('-')) {
                return message.channel.send('Veuillez spécifier un nombre valide.')
            }

            if (member2 < args[0]) {
                return message.channel.send('Vous n\'avez pas autant d\'argent à la banque')
            }

            let embed5 = new MessageEmbed()
                .setColor('2F3136')
                .setDescription(`Vous avez retiré ${args[0]} coins de votre banque`);

            message.channel.send(embed5)
            db.subtract(`banque_${user.id}`, args[0])
            db.add(`argent_${user.id}`, args[0])
        }
    }
}