const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tkick",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let dd = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(dd === null) return message.lineReply(`:x: Il faut être capitaine d'une team pour pouvoir kick quelqu'un!`)

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.lineReply(`:x: Merci d'entrer un membre valide !`)
if(db.get(`teammember_${message.guild.id}_${dd}_${user.id}`) === null) return message.lineReply(`:x: Merci de mentionner un membre qui est dans votre team !`)
    if(user) {

message.lineReply(`Voulez vous kick ${user} de votre team **${dd}** ?\n✅・Oui\n❌・Non`).then(async m => {
m.react("✅")
m.react("❌")
let collector = m.createReactionCollector((reaction, usere) => usere.id === message.author.id);
collector.on("collect", async (reaction, usere) => {
  if (reaction._emoji.name === "✅") {
if(db.get(`teammember_${message.guild.id}_${dd}_${user.id}`).length >= 1){
    db.set(`teammember_${message.guild.id}_${dd}_${user.id}`, db.get(`teammember_${message.guild.id}_${dd}_${user.id}`))
}else {
    db.delete(`teammember_${message.guild.id}_${dd}_${user.id}`)
}

db.subtract(`teamsnumber_${message.guild.id}_${dd}`, 1)
db.subtract(`teamsnumber_${message.guild.id}_${user.id}`, 1)

message.lineReply(`✅ **${user.tag}** à été kick de votre team !`)


  }
  if (reaction._emoji.name === "❌") {
message.lineReply(`Opération annuler`)  

}
})
})

    }
    }
}

