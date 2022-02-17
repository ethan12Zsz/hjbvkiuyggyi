const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tleave",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let dd = args.join(" ")
        if(!dd) return message.lineReply(`:x: Merci d'entrer le nom d'une team existantes !`) 
        if(db.get(`teammember_${message.guild.id}_${dd}_${message.author.id}`) === null) return message.lineReply(`:x: Vous n'êtes pas dans cette team !`)
        let ee = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(ee === true)  return message.lineReply(`:x: Vous êtes capitaine de cette team vous pouvez pas la quitter mais vous pouvez la supprimé avec la commande \`${data.prefix}tdelete\`!`)



message.lineReply(`Voulez vous leave la team **${dd}** ?\n✅・Oui\n❌・Non`).then(async m => {
m.react("✅")
m.react("❌")
let collector = m.createReactionCollector((reaction, usere) => usere.id === message.author.id);
collector.on("collect", async (reaction, usere) => {
  if (reaction._emoji.name === "✅") {
    if(db.get(`teammember_${message.guild.id}_${dd}_${message.author.id}`).length >= 1){
      db.set(`teammember_${message.guild.id}_${dd}_${message.author.id}`, db.get(`teammember_${message.guild.id}_${dd}_${message.author.id}`))
  }else {
      db.delete(`teammember_${message.guild.id}_${dd}_${message.author.id}`)
  }
  db.subtract(`teamsnumber_${message.guild.id}_${dd}`, 1)
  db.subtract(`teamsnumber_${message.guild.id}_${message.author.id}`, 1)
message.lineReply(`✅ **${message.author.tag}** Vous avez leave cette team !`)


  }
  if (reaction._emoji.name === "❌") {
message.lineReply(`Opération annuler`)  

}
})
})

    }
    
}

