const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "cshop",
    aliases: ["cboutique"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
      let member = await db.get(`money_${message.guild.id}_${message.author.id}`)
if(member === null ) member = 0
        let lb = db.all().filter(data => data.ID.startsWith(`items_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        lb.length = 10;
        var finalLb = "Aucun donné trouvé";
        for (var i in lb) {
          finalLb = `${lb.indexOf(lb[i])+1}) Rôle: ${message.guild.roles.cache.get(lb[i].ID.split('_')[2])} (${lb[i].ID.split('_')[2]})\n\`Prix: ${lb[i].data} coins\` \n`;
        } 
        const embed = new Discord.MessageEmbed()
        .setAuthor('Boutique d\'items personnalisés de '+message.guild.name, "https://media.discordapp.net/attachments/849036131205906503/849336538809630730/shopimg.png")
        .setDescription(finalLb)
        .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
               message.lineReply(embed).then(m => {

                m.react("✔️")
                let collector = m.createReactionCollector((reaction, user) => user.id === message.author.id);
                collector.on("collect", async (reaction, user) => {
                  if (reaction._emoji.name === "✔️") {
                    await message.channel.send("Veuillez entrer le rôle d'un items.")
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (cld) => {
                        let mem =  cld.first().mentions.roles.first() || message.guild.roles.cache.get(cld.first().content) 
                        if(!mem) return message.channel.send(`:x: Ce rôle n'existe pas !`)
                        if(!db.get(`items_${message.guild.id}_${mem.id}`) ) return message.channel.send(`:x: Items introuvable !`)
                        if (member <= db.get(`items_${message.guild.id}_${mem.id}`)) {
                          return message.channel.send(`:x: Vous n'avez pas asser pour cette items.`)
                              }
                              db.subtract(`money_${message.guild.id}_${message.author.id}`,db.get(`items_${message.guild.id}_${mem.id}`) )
                              message.member.roles.add(mem.id)
message.channel.send(`✅ Items acheter !`)

                    })
       

                }
                reaction.users.remove(message.author.id);

                })
               })
    }
}