const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "rob",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
      
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.lineReply(`:x: Merci d'entrer un membre valide !`)
        let antirob = db.get(`antirob_${message.guild.id}_${user.id}`)
        if(antirob === true) message.lineReply(`L'utilisateur indiquer posséde un anti-rob !`)
        let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)
        let author = await db.fetch(`rob_${message.guild.id}_${user.id}`)
        let author2 = await db.fetch(`money_${message.guild.id}_${user.id}`)
        
        let timeout = 1800000;
        
        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
        
            let timeEmbed = new Discord.MessageEmbed()
              .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
            .setDescription(`:x: Vous avez déjà volé quelqu'un\n\nRéessayez dans **${time.minutes}**m **${time.seconds}**s`);
            message.lineReply(timeEmbed)
          } else {
        
        let moneyEmbed = new Discord.MessageEmbed()
            .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
          .setDescription(`:coin: Vous avez besoin d'au moins \`200 coins\` dans votre portefeuille pour voler quelqu'un`);
        
        if (author2 < 200) {
            return message.lineReply(moneyEmbed)
        
        }
        let moneyEmbed2 = new Discord.MessageEmbed()
            .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
          .setDescription(`**${user.user}** n'a rien que tu puisses voler`);
        if (targetuser < 0) {
            return message.lineReply(moneyEmbed2)
        }
        
        
        
        let vip = await db.fetch(`bronze_${user.id}`)
        if(vip === true) random = Math.floor(Math.random() * 200) + 1;
        if (vip === null) random = Math.floor(Math.random() * 100) + 1;
        
        let embed = new Discord.MessageEmbed()
        .setDescription(`:coin: Vous avez volé ${user} et vous vous êtes enfui avec \`${random} coins\` !`)
          .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
        message.lineReply(embed)
        
        db.subtract(`money_${message.guild.id}_${user.id}`, random)
        db.add(`money_${message.guild.id}_${user.id}`, random)
        db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
          
        };
    
        
           
          
    }
}
