const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tcreate",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {

        let dd = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(dd) return message.lineReply(`:x: Vous avez déjà une team, supprimé la et refaite la commande !`)
        let money = db.get(`money_${message.guild.id}_${message.author.id}`)
        if(money <= 2000 ){  message.lineReply(`:x: Vous n'avez pas assez pour crée une team !`)

      }  else {
    message.lineReply(`:eyes: Veuillez entrer le **nom** de la team:\n(Tapez \`cancel\` pour annuler l'action en cours)`)

  const filter = m => message.author.id === m.author.id;
    message.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(async (cld) => {
        if(cld.first().content === "cancel") { message.lineReply(`Opérations annulée`)
    }else {
        if(db.get(`teams_${message.guild.id}_${cld.first().content}`)) return message.lineReply(`Une team avec ce nom existe déjà !`)
        message.channel.send(`:eyes: Veuillez entrer la **Description** de la team:\n(Tapez \`cancel\` pour annuler l'action en cours)`)
message.channel.awaitMessages(filter, {
    max: 1,
    time: 60000,
    errors: ['time']
}).then(async (cld2) => {
    if(cld2.first().content === "cancel") { message.lineReply(`Opérations annulée`)
}else {
db.set(`teams_${message.guild.id}_${message.author.id}`, cld.first().content)
let dde = db.get(`teams_${message.guild.id}_${message.author.id}`)
db.set(`teamdes_${message.guild.id}_${dde}`, cld2.first().content)
db.set(`teamscap_${message.guild.id}_${dde}`, message.author.id)
db.push(`teamlist_${message.guild.id}`, {date: Date.parse(new Date)/1000, nom: cld.first().content, owner: message.author.id, desc: cld2.first().content})
db.add(`teamliste_${message.guild.id}`, 1)
db.set(`teamdate${message.guild.id}_${dde}`, Date.parse(new Date)/1000)
db.add(`teamsnumber_${message.guild.id}_${message.author.id}`, 1)
db.subtract(`money_${message.guild.id}_${message.author.id}`, 2000)
const embed = new Discord.MessageEmbed()
embed.setTitle(`Team crée`)
embed.setTimestamp()
embed.setColor(data.color)
embed.setFooter(client.user.username )

embed.setDescription(`Nom: ${cld.first().content}\nDescription: ${cld2.first().content}\nCapitaine: ${message.author}\nDate de création: <t:${Date.parse(new Date)/1000}>`)
message.channel.send(embed)
}
})
}

    })

        }
    }}