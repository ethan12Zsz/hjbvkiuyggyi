const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");
module.exports = {
    name: "mine",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
        if (db.get(`pick_${message.guild.id}_${message.author.id}`) === true) {
            let timeoutmine = 600000
            let mined =  db.fetch(`mined_${message.guild.id}_${message.author.id}`)
    
            if (mined != null && timeoutmine - (Date.now() - mined) > 0) {
                let time = ms(timeoutmine - (Date.now() - mined));
                message.lineReply(`:x: Vous avez déjà miné, revenez dans **${time.hours}h ${time.minutes}m ${time.seconds}s**`)    
    
            } else {
                let amountearned = Math.floor(Math.random() * 500) + 1
    
                let jobs = ["Diamant", "Or", "Argent", "Fer", "Émeraude", "Cuivre"]
                                let job = jobs[Math.floor(Math.random()* jobs.length)]
    
                let embed = new Discord.MessageEmbed()
                .setColor(data.color)
                .setFooter(client.user.username)
                .setTimestamp()
                .setDescription(`⛏️ ${message.author}, vous avez extrait: **${job}** et gagnez \`${amountearned} coins\` !`)
    
                message.lineReply(embed)
    
                db.add(`money_${message.guild.id}_${message.author.id}`, amountearned)
                db.set(`mined_${message.guild.id}_${message.author.id}`, Date.now())
            }
    
        } else if(db.get(`pick_${message.guild.id}_${message.author.id}`) === null) {
            message.lineReply(`:x: Vous devez d'abord acheter une **pioche** (*Utilisez la commande \`shop\` pour acheter une **pioche** !*)`)
        }

        
           
          
    }
}
