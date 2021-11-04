const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const travail = require('../../travail.json')
const travaill = travail[Math.floor(Math.random() * travail.length)];

module.exports = {
	name:"work",
	aliases:["travail"],
	description:"Permet de travailler et gagner de l'argent.",

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */

	run : async(client, message, args) => {

        let user = message.author;
        let userr = await db.fetch(`travail_${user.id}`)

        let timeout = 1000000;

        if (userr !== null && timeout - (Date.now() - userr) > 0) {
             message.channel.send(`Tu as déjà travaillé il n'y a pas longtemps.`)
        }

        else {
            let gain = Math.floor(Math.random() * 80) + 1;
            let embed = new MessageEmbed()
            .setDescription(`Tu as travaillé en tant que \`${travaill}\` et tu as gagné \`${gain}$\``)
            .setFooter('Mitsuki - Economy ©')
            message.channel.send(embed)

            db.add(`travailcount_${user.id}`, 1)
            db.add(`argent_${user.id}`, gain)
            db.set(`travail_${user.id}`, Date.now())
        }
    }
}