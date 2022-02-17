const db = require("quick.db");
const Discord = require("discord.js");
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "items",
    aliases: [],
    cooldown: 2000,
    whitelistOnly: true,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args, data) {
        
        let title = `<a:fleche:847072706411495445> __Paramétre des items configurable__`
    const embed = new Discord.MessageEmbed()

    embed.setTitle(title)
    embed.setTimestamp()
    embed.setColor(data.color)
    embed.setFooter(client.user.username )

    embed.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
    ➕・Ajouter un items
    ➖・Retirer un items
    ❌・Fermer la fenêtre
   `)

  const msg = await message.lineReply(embed)
  await msg.react('➕')
  await sleep(250);
  await msg.react('➖')
  await sleep(250);
  await msg.react('❌')
  
  await sleep(250).then(async (m) => {


            let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "➖") {
                    await message.channel.send("➖ Veuillez entrer un rôle valide.")
                      const filter = m => message.author.id === m.author.id;
                      message.channel.awaitMessages(filter, {
                          max: 1,
                          time: 60000,
                          errors: ['time']
                      }).then(async (cld) => {
                        let mem = message.guild.roles.cache.get(cld.first().content) ||  cld.first().mentions.roles.first()
                          if(!mem) return message.lineReply(`:x: Ce rôle n'existe pas !`)
                          if(!db.get(`items_${message.guild.id}_${mem.id}`)) return message.lineReply(`:x: Ce rôle n'est pas dans un items !`)
                          db.delete(`items_${message.guild.id}_${mem.id}`)
  message.lineReply(`✅ Items retirer !`)

                      })
                  }
                  if (reaction._emoji.name === "❌") {
                    message.delete()  
                    msg.delete()
                      
                  }
                if (reaction._emoji.name === "➕") {
                    await message.channel.send("➕ Veuillez entrer un rôle.")
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (cld) => {
                        let mem = cld.first().mentions.roles.first() || message.guild.roles.cache.get(cld.first().content) 
                        if(!mem) return message.lineReply(`:x: Ce rôle n'existe pas !`)
                        await message.lineReply("➕ Veuillez entrer un prix.")
                        const filter = m => message.author.id === m.author.id;
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (cld2) => {
                      
                       if(isNaN(cld2.first().content)) return message.lineReply(`:x: Merci d'entrer un montant valide !`)
                        db.set(`items_${message.guild.id}_${mem.id}`,cld2.first().content)
message.lineReply(`✅ Items ajouter !`)
})
                    })
       

                }
                reaction.users.remove(message.author.id);

            })})
    }
}
