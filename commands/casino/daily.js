const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "daily",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
      
  let user = message.author;

  let timeout = 86400000;
  
  let amount = Math.floor(Math.random() * 300);

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
 
    message.lineReply(`:x: Vous avez déjà récolter vos reward du jour, re essayer dans **${time.hours}h** **${time.minutes}**m **${time.seconds}**s`)
} else {
    let moneyEmbed = new Discord.MessageEmbed()
    .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
        .setDescription(`:coin: Vous avez recupérer vos reward du jour, vous avez gagner **${amount}** coins`)
  message.lineReply(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
    
        
           
          
    }
}
