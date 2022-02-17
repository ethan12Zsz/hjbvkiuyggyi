const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tedit",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let dd = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(dd === null) return message.lineReply(`Vous n'avez pas de team !`)
        let ee = db.get(`teamdes_${message.guild.id}_${dd}`)
        if(ee === null) ee = "Ancune donnée trouvée"

        const embed = new Discord.MessageEmbed()
        .setTitle(` Panel de modification de la team ${dd}`)
        .setDescription(`✏️ **Nom**: ${dd}\n📃 **Description**: ${ee} `)
        .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
              message.lineReply(embed).then( async m => {

                m.react("✏️")
                await sleep(250)
                m.react("📃")
                await sleep(250)

                let collector = m.createReactionCollector((reaction, user) => user.id === message.author.id);
                collector.on("collect", async (reaction, user) => {
                  if (reaction._emoji.name === "✏️") {
                   message.lineReply(`✏️ Veuillez entrer le **nom** de la team:\n(Tapez \`cancel\` pour annuler l'action en cours)`).then(async mm => {

                    const filter = m => message.author.id === m.author.id;
                      message.channel.awaitMessages(filter, {
                          max: 1,
                          time: 60000,
                          errors: ['time']
                      }).then(async (cld) => {
                          if(cld.first().content === "cancel") { message.lineReply(`Opérations annulée`)
                          question.delete()
                          cld.first().delete()
                      }else {
                        mm.delete()
                        cld.first().delete()

                  db.set(`teams_${message.guild.id}_${message.author.id}`, cld.first().content)
                  let eee = db.get(`teamdes_${message.guild.id}_${dd}`)
                  if(eee === null) eee = "Ancune donnée trouvée"
                  const slm = new Discord.MessageEmbed()
                  .setTitle(` Panel de modification de la team ${dd}`)
                  .setDescription(`✏️ **Nom**: ${cld.first().content}\n📃 **Description**: ${eee} `)
                  .setTimestamp()
                  .setColor(data.color)
                  .setFooter(client.user.username)
          m.edit(slm)
                  
                     
                      }}) })
                }
                if (reaction._emoji.name === "📃") {
                message.lineReply(`📃 Veuillez entrer la **description** de la team:\n(Tapez \`cancel\` pour annuler l'action en cours)`).then(async mm => {

                    const filter = m => message.author.id === m.author.id;
                      message.channel.awaitMessages(filter, {
                          max: 1,
                          time: 60000,
                          errors: ['time']
                      }).then(async (cld) => {
                          if(cld.first().content === "cancel") { message.lineReply(`Opérations annulée`)
                          mm.delete()
                          cld.first().delete()
                      }else {
                          
                  db.set(`teamdes_${message.guild.id}_${dd}`, cld.first().content)
                  mm.delete()
                  cld.first().delete()
                  let dde = db.get(`teams_${message.guild.id}_${message.author.id}`)
                  if(dde === null) dde = "Ancune donnée trouvée"
                  const slm = new Discord.MessageEmbed()
                  .setTitle(` Panel de modification de la team ${dd}`)
                  .setDescription(`✏️ **Nom**: ${dde}\n📃 **Description**: ${cld.first().content} `)
                  .setTimestamp()
                  .setColor(data.color)
                  .setFooter(client.user.username)
          m.edit(slm)
                  
                         
                      }})})
                }
            })               
               })
    }
}