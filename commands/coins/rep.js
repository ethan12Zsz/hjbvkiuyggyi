const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "rep",
    aliases: ["reputation"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
        let timeout = 86400000;
        let amount = 200;
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.lineReply(`:x: Merci d'entrer un membre valide !`)
        if(user.bot) return message.lineReply(":x: Vous ne pouvez pas ajouté des réputation à un bot !")
        if(user.id === message.author.id) return message.lineReply(":x: Vous ne pouvez pas vous ajouté des réputation par vous même !")
        let daily = await db.fetch(`repe_${message.guild.id}_${user.id}`);
      
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms(timeout - (Date.now() - daily));
        
       
          message.lineReply(`:x: Vous avez déjà donner un points de réputation aujourd'hui, re essayer dans **${time.hours}h** **${time.minutes}**m **${time.seconds}**s`)
      } else {
 
    db.add(`rep_${message.guild.id}_${user.id}`,1)
    db.set(`repe_${message.guild.id}_${user.id}`, Date.now())
        message.lineReply(`:small_red_triangle: **${user.tag}** vient de gagner \`1 réputation\``)
      }    
          
    }
}
