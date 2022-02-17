const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");
module.exports = {
    name: "beg",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
        let user = message.author;

        let timeout = 180000;
        let amount = 5;
      
        let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);
      
        if (beg !== null && timeout - (Date.now() - beg) > 0) {
          let time = ms(timeout - (Date.now() - beg));
        
    
          message.lineReply(`:x: Vous avez déjà mendié réssament, re essayer dans **${time.minutes}**m **${time.seconds}**s`)
        } else {
          let moneyEmbed = new Discord.MessageEmbed()
        .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
        .setDescription(`Vous avez mendié et vous avez gagner \`${amount} coins\` !`)
        message.lineReply(moneyEmbed)
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`beg_${message.guild.id}_${user.id}`, Date.now())}
       
    
        
           
          
    }
}
