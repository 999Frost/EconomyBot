const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	name:"balance",
	aliases:["bal", "money", "coins"],
	description:"Voir tout l'argent récolté.",

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */

	run : async(client, message, args) => {
		let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(
			r =>
			  r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
		  ) ||
		  message.guild.members.cache.find(
			r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
		  ) ||
		  message.member;
    
		if(!user) {
			return message.channel.send("Veuillez mentionner un membre valide.")
		}


		let bal = db.fetch(`argent_${user.id}`)

		if (bal === null) bal = 0; 

		let bank = db.fetch(`banque_${user.id}`)

		if (bank === null) bank = 0;

		let total = bal + bank
		if (user) {
			let embed = new MessageEmbed()
			.setColor("#2F3136")
			.setTitle(`Voici l'argent de ${user.user.username}`)
			.setDescription(`Argent : \`${bal}$\`\nBanque :  \`${bank}$\`\nTotal : \`${total}$\``)
			.setFooter("Mitsuki - Economy ©")

			message.channel.send(embed)
		}
	} 
}