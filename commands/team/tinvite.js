const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
const search = require("discord.js-search");
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tinvite",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let dd = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(dd === null) return message.lineReply(`:x: Il faut être capitaine d'une team pour pouvoir inviter quelqu'un !`)
        let cppe = db.get(`teamsnumber_${message.guild.id}_${dd}`)
        if(cppe === null) cppe = 0
        if(cppe > 10) return message.lineReply(`:x: Vous avez déppasser le nombre maximal  d'une team (**10** maxi) !`)
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.lineReply(`:x: Merci d'entrer un membre valide !`)
if(db.get(`teamsnumber_${message.guild.id}_${user.id}`) === 1) return message.lineReply(`${user} est déja dans une team !`)
let ee = db.get(`teams_${message.guild.id}_${user.id}`)
if(ee)  return message.lineReply(`${user} est déja dans une team !`)
    if(user) {

message.channel.send(`${user}, Voulez vous rejoindre la team de ${message.author} (**${dd}**) ?\n✅・Oui\n❌・Non`).then(async m => {
m.react("✅")
m.react("❌")
let collector = m.createReactionCollector((reaction, usere) => usere.id === user.id);
collector.on("collect", async (reaction, usere) => {
  if (reaction._emoji.name === "✅") {
db.set(`teammember_${message.guild.id}_${dd}_${user.id}`, true)

    db.add(`teamsnumber_${message.guild.id}_${dd}`, 1)
    db.add(`teamsnumber_${message.guild.id}_${user.id}`, 1)


message.lineReply(`✅ ${user} a accepter votre invite pour votre team !`)


  }
  if (reaction._emoji.name === "❌") {
message.lineReply(`:x: ${user} a refuser votre invite pour votre team !`)

}
})
})

    }
    }
}

