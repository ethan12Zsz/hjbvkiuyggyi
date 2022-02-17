const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tlist",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
      let lt = db.get(`teamlist_${message.guild.id}`)
  if(lt === null) return message.lineReply(`Aucune team trouvé sur le serveur`)
  let lb = db.get(`teamliste_${message.guild.id}`)
  if(lb === null) lb = 0
        
       
    
                    try {
                let tdata = await message.lineReply(message.translate.admin.whitelist.list.loading)

                let p0 = 0;
                let p1 = 15;
                let page = 1;

                let embed = new Discord.MessageEmbed()


                embed        .setAuthor('Liste des team de '+message.guild.name, "https://images-ext-2.discordapp.net/external/4G6FdrxJUe8deJe1qUD9WhcyDX-SQ9x6UydJfHe3snA/https/media.discordapp.net/attachments/506838906872922145/506899959816126493/h5D6Ei0.png")
                .setColor(data.color)
                .setDescription(lt
                    .map(r => r)
               
                        .map((user, i) => `${i+1}) **Nom**: ${user.nom}\n**Description**: ${user.desc}\n**Capitaine**: <@${user.owner}>\n**Date de création**: <t:${user.date}>`)

                    .slice(0, 15)
                    )
                    .setFooter(`${page}/${Math.ceil(lb  / 15)}・${data.footer || client.user.username}`)  
                let reac1
                let reac2
                let reac3

                if (lb > 15) {
                 
                    reac1 = await tdata.react("⬅");
                    await sleep(250);
                    reac2 = await tdata.react("❌");
                    await sleep(250);
                    reac3 = await tdata.react("➡");
                    await sleep(250);
                }

                tdata.edit(" ", embed);

                const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

                data_res.on("collect", async (reaction) => {

                    if (reaction.emoji.name === "⬅") {

                        p0 = p0 - 15;
                        p1 = p1 - 15;
                        page = page - 1

                        if (p0 < 0) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }


                        embed.setDescription(lt
                            
                            .map(r => r)
                            .map((user, i) => `${i+1}) **Nom**: ${user.nom}\n**Description**: ${user.desc}\n**Capitaine**: <@${user.owner}>\n**Date de création**: <t:${user.date}>`)
                            .slice(p0, p1)
                            )
                            .setFooter(`${page}/${Math.ceil(lb  / 15)}・${data.footer || client.user.username}`)  
                        tdata.edit(embed);

                    }

                    if (reaction.emoji.name === "➡") {

                        p0 = p0 + 15;
                        p1 = p1 + 15;

                        page++;

                        if (p1 > lb + 15) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }


                        embed.setDescription(lt
                            
                            .map(r => r)
                            .map((user, i) => `${i+1}) **Nom**: ${user.nom}\n**Description**: ${user.desc}\n**Capitaine**: <@${user.owner}>\n**Date de création**: <t:${user.date}>`)
                            .slice(p0, p1)
                            )
                            .setFooter(`${page}/${Math.ceil(lb  / 15)}・${data.footer || client.user.username}`)  
                        tdata.edit(embed);

                    }

                    if (reaction.emoji.name === "❌") {
                        data_res.stop()
                        reac1.remove()
                        reac2.remove()
                        return reac3.remove()
                    }

                    await reaction.users.remove(message.author.id);

                })

            } catch (error) {
                console.log(error)
            }
        
    }}