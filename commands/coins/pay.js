const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');

module.exports = {
    name: "pay",
    aliases: ["donner"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let user = message.mentions.members.first() 

        let member = await db.get(`money_${message.guild.id}_${message.author.id}`)

        if (!user || !args[1]) {
        return message.lineReply(message.translate.error(this, "args"))
        }

        if (message.content.includes('-')) { 
            return message.lineReply(':x: Ce n\'est pas possible !')
                }

        if (member <= args[1]) {
            return message.lineReply(`:x: Le montant que vous vouliez transférer était supérieur au montant d'argent que vous possédez. Veuillez réessayer avec un montant valide.`)
                }

                message.lineReply(`:coin: | Vous avez donner  **${args[1]}** coins à **${user.user.username}** !`)        
        db.add(`money_${message.guild.id}_${user.id}`, args[1]) 
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
      
     
       
   
    }
}