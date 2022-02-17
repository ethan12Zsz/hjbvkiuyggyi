const Discord = require("discord.js")
const db = require('quick.db');
module.exports = {
    name: "with",
    aliases: ["retirer"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
    

       
        let user = message.author;

        let member = db.fetch(`money_${message.guild.id}_${user.id}`)
        let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)
      
        if (args[0] == 'all') {
          let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
          
          db.subtract(`bank_${message.guild.id}_${user.id}`, money)
          db.add(`money_${message.guild.id}_${user.id}`, money)
          let embed5 = new Discord.MessageEmbed()
        .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
        .setDescription(`:coin: Vous avez retiré **tous vos coins** de votre banque`);
        message.lineReply(embed5)
        
        } else {
      
        let embed2 = new Discord.MessageEmbed()
        .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
        .setDescription(`:coin: Spécifiez un montant à retirer`);
        
        if (!args[0]) {
            return message.lineReply(embed2)
        }
        let embed3 = new Discord.MessageEmbed()
        .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
        .setDescription(`:coin: Vous ne pouvez pas retirer d'argent négatif`);
      
        if (message.content.includes('-')) { 
            return message.lineReply(embed3)
        }
        let embed4 = new Discord.MessageEmbed()
        .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
        .setDescription(`:coin: Vous n'avez pas beaucoup de coins dans votre banque`);
      
        if (member2 < args[0]) {
            return message.lineReply(embed4)
        }
      
        let embed5 = new Discord.MessageEmbed()
        .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
        .setDescription(`:coin: Vous avez retiré **${args[0]}** coins de votre banque`);
      
        message.lineReply(embed5)
        db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
        db.add(`money_${message.guild.id}_${user.id}`, args[0])
        }
        
           
          
    }
}
