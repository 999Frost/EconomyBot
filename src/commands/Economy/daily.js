const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
	name:"daily",
	aliases:["jour"],
	description:"Permet de gagner de l'argent tout les jours",

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */

	run : async(client, message, args) => {


let user = message.author;

let timeout = 86400000;
let amount = 200;

let daily = await db.fetch(`daily_${user.id}`);

if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));

    let embed = new MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`Vous avez déjà collecter vos coins du jour`)
        .setFooter('Mitsuki - Economy ©')
    message.channel.send(embed)
} else {
    let embedd = new MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`Vous avez reçu ${amount} coins`)
        .setFooter('Mitsuki - Economy ©')
    message.channel.send(embedd)
    db.add(`argent_${user.id}`, amount)
    db.set(`daily_${user.id}`, Date.now())


}

    }
}