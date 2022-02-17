const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const ms = require("ms");

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "enchere",
    aliases: ["start"],
    cooldown: 2000,
    whitelistOnly: true,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args, data) {
 //    message.lineReply(`Commande **désactivé** !`)
        var channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
        if(!channel) return message.lineReply(`:x: Veuillez definir le salon de l'enchére.`)
       var durée = args[1]
       if(!durée || !durée.endsWith("d") && !durée.endsWith("h") && !durée.endsWith("m") && !durée.endsWith("s")) return message.lineReply(message.translate.error(this, "args"))
       var montant = args[2]
if(!montant ||isNaN(montant)) return message.lineReply(message.translate.error(this, "args"))
var gain = args.slice(3).join(" ")
if(!gain) return message.lineReply(message.translate.error(this, "args"))
let slme = db.get(`bank_${message.guild.id}_${message.author.id}`)
if(slme == null) slme = 0

if(slme <= montant) return message.channel.send(`:x: ${message.author} Vous n'avez pas asser de coins en banque pour enchérir !`)
             message.channel.send(`✅ Enchére lancé dans ${channel}.`)
         
             var timestamp = Date.now() + ms(durée)
             var embed = new MessageEmbed()
             .setTitle(gain)
             .setDescription(`Réagissez avec :tada: pour enchérir !
             Durée: ${duration(ms(durée))}
             Lancé par: ${message.author}

             **Dernier enchérisseur**: ${message.author} 
             **Dernier prix**: ${montant}

             :warning: Le bot ne prend que vos coins en banque
             `)
             .setColor(data.color)
             .setFooter(`Fin`)
             .setTimestamp(Date.now() + ms(durée))
           await channel.send(embed).then(async msg => {
             msg.react("🎉")
             db.set(`user_${message.guild.id}_${msg.id}`, message.author.id)

         client.on("messageReactionAdd", async (reaction, user) => {
            
             if(reaction.emoji.name === "🎉") {
              if(user.bot) return 
              if(user.id === client.user.id) return

              await reaction.users.remove(user.id);
              let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
                if(bank == null) bank = 0
                let ee = db.get(`user_${message.guild.id}`)
                let ouf = db.get(`userm_${message.guild.id}`)
if(ouf === null ) ouf = montant
if(bank <= ouf) return message.channel.send(`:x: ${user} Vous n'avez pas asser de coins en banque pour enchérir !`).then(msg => msg.delete({timeout: 1000}));
if(user.id === ee) {return message.channel.send(`:x: ${user} Vous êtes déjà le dernier enchérisseur !`).then(msg => msg.delete({timeout: 1000}));
             }else{ 
 let ttm = duration(Date.now() + ms(durée) - Date.now())
             if(!ttm.includes("-")) {

  let ppp = ouf * 2 - ouf + montant * 2 - montant 
  var embed = new MessageEmbed()
  .setTitle(gain)
  .setDescription(`
  Réagissez avec :tada: pour enchérir !
  Durée: ${ttm}
  Lancé par: ${message.author}
  
  **Dernier enchérisseur**: ${user} 
  **Dernier prix**: ${ppp}

  :warning: Le bot ne prend que vos coins en banque`)
  .setColor(data.color)
  .setFooter(`Fin`)
  .setTimestamp(Date.now() + ms(durée))
 msg.edit(embed)
 db.set(`user_${message.guild.id}_${msg.id}`, user.id)
 db.set(`userm_${message.guild.id}_${msg.id}`, ppp)
 message.channel.send(`✅ ${user} Vient d'enrèchir \`${ppp} coins\` ! `).then(msg => msg.delete({timeout: 1000}));
             }
             
             }}
             
         })
         setTimeout(async () => {

      
          let eeee = db.get(`usermm_${message.guild.id}_${msg.id}`)
          if(eeee === null) eeee = 0
         if (eeee > 1) {
          return message.channel.send(`:x: Aucun gagnant`)
       }
     
        let    winner = db.get(`user_${message.guild.id}_${msg.id}`)
        
        if(winner === null) winner = message.author.id
        let ouf = db.get(`userm_${message.guild.id}`)
        if(ouf === null ) ouf = montant
       var eee = new MessageEmbed()
        .setTitle(gain)
        .setDescription(`
        Gagnant: <@${winner}>
        Prix: ${ouf}
        Lancé par: ${message.author}`)
        .setColor(data.color)
        .setFooter(`Finis`)
        .setTimestamp()
       msg.edit("" ,eee)
   
      if(winner) db.add(`bank_${message.guild.id}_${winner}`, ouf)
      await msg.reactions.cache.get("🎉").remove()
       db.delete(`usermm_${message.guild.id}_${msg.id}`)
       db.delete(`user_${message.guild.id}_${msg.id}`)
       db.delete(`userm_${message.guild.id}_${msg.id}`)
        channel.send(`:tada: Le gagnant de l'enchère pour un(e) **${gain}** est <@${winner}> qui aura enchéri \`${montant} coins\` !`)
    
        }, ms(durée));
            })
            
    
     
    }
}
function duration(mss) {
  const sec = Math.floor((mss / 1000) % 60).toString()
  const min = Math.floor((mss / (1000 * 60)) % 60).toString()
  const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
  const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()
  return `${days.padStart(2, '') == "0" ? "" : `**${days.padStart(2, '')}** jours, `}${hrs.padStart(2, '') == "0" ? "" : `**${hrs.padStart(2, '')}** heures, `}${min.padStart(2, '') == "0" ? "" : `**${min.padStart(2, '')}** minutes et `}**${sec.padStart(2, '')}** secondes.`
}