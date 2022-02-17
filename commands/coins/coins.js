const Discord = require("discord.js")
const db = require('quick.db');
module.exports = {
    name: "coins",
    aliases: ["balance", "money"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        if(!user) return message.lineReply(`:x: Merci d'entrer un membre valide !`)      
          let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
        let coin = db.fetch(`money_${message.guild.id}_${user.id}`)
if(bank == null) bank = 0
if(coin == null) coin = 0
let rep = db.get(`rep_${message.guild.id}_${user.id}`)
if(rep === null) rep = "0"
        const embed = new Discord.MessageEmbed()
        embed.setAuthor(user.tag, user.displayAvatarURL({dynamic : true }) )
        embed.setColor(data.color)
        embed.setDescription(`${user} a\n:coin: **${coin}** En poche\n:bank: **${bank}** En banque\n:small_red_triangle: **${rep}** points de réputation`)
        embed.setFooter(client.user.username)
        embed.setTimestamp()
        message.lineReply(embed)


       
    
        
           
          
    }
}
