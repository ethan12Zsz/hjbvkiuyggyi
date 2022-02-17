const Discord = require("discord.js");
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "whitelist",
    aliases: ["wl"],
    cooldown: 2000,
    ownerOnly: true,
    userPermissions: [ ],
        botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],    
    async execute(client, message, args, data) {
      

   
          

             
           

             
        if (args[0] === 'add') {
            let member = message.guild.member(message.author.id);
            if (args[1]) {
                member = message.guild.member(args[1]);
            } else {
                return message.lineReply(message.translate.error(this, "args"))

            }
            if (message.mentions.members.first()) {
                member = message.guild.member(message.mentions.members.first().id);
            }

            if (!member) return message.lineReply(`Aucun membre trouvé pour \`${args[1]|| "rien"}\``)


            if (data.whitelist.includes(member.user.id))  return message.lineReply(`${member.user.username} est déjà dans la whitelist`)


            let tempdata = data.whitelist

            tempdata.push(member.user.id)

            data.whitelist = tempdata
            data.save().then(async () => {
                message.lineReply(message.translate.admin.whitelist.add(member))
            })
        } else if (args[0] === "clear") {
            data.whitelist =  "whitelist".split('==%;')
            data.save().then(async () => {
                message.lineReply(`${data.whitelist.length} ${data.whitelist.length > 1 ?  "personnes ont été supprimées" : "personne a été supprimée"} de la whitelist`)            })
        } else if (args[0] === "remove") {
            let member = message.guild.member(message.author.id);
            if (args[1]) {
                member = message.guild.member(args[1]);
            } else {
                return message.lineReply(message.translate.error(this, "args"))

            }
            if (message.mentions.members.first()) {
                member = message.guild.member(message.mentions.members.first().id);
            }

            if (!member) return message.lineReply(`Aucun membre trouvé pour \`${args[1]|| "rien"}\``)


            if (!data.whitelist.includes(member.user.id)) return message.lineReply(`${member.user.username} n'est pas dans la whitelist`)

            let tempdata = data.whitelist

            tempdata = tempdata.filter(x => x !== member.user.id)

            data.whitelist = tempdata
            data.save().then(async () => {
                message.lineReply(message.translate.admin.whitelist.remove(member))
            })
          
        }else if (args[0] === "list") {
            try {
                let tdata = await message.lineReply(message.translate.admin.whitelist.list.loading)

                let p0 = 0;
                let p1 = 15;
                let page = 1;

                let embed = new Discord.MessageEmbed()


                embed.setTitle(message.translate.admin.whitelist.list.title(data.whitelist.length - 1))
                .setColor(data.color)
                .setDescription(data.whitelist
                    .filter(x => message.guild.members.cache.get(x))
                    .map(r => r)
                    .map((user, i) => `${i+1}・<@${message.guild.members.cache.get(user).user.id}>`)
                    .slice(0, 15)
                    )
                    .setFooter(`${page}/${Math.ceil(data.whitelist.length  / 15)}・${client.user.username}`)  
                                 .setFooter(`${page}/${Math.ceil(data.whitelist.length  / 15)}・${client.user.username}`)    
                let reac1
                let reac2
                let reac3

                if (data.whitelist.length > 15) {
                 
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


                        embed.setDescription(data.whitelist
                            .filter(x => message.guild.members.cache.get(x))
                            .map(r => r)
                            .map((user, i) => `${i + 1}・<@${message.guild.members.cache.get(user).user.id}>`)
                            .slice(p0, p1)
                            )
                            .setFooter(`${page}/${Math.ceil(data.whitelist.length  / 15)}・${client.user.username}`)  
                        tdata.edit(embed);

                    }

                    if (reaction.emoji.name === "➡") {

                        p0 = p0 + 15;
                        p1 = p1 + 15;

                        page++;

                        if (p1 > data.whitelist.length + 15) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }


                        embed.setDescription(data.whitelist
                            .filter(x => message.guild.members.cache.get(x))
                            .map(r => r)
                            .map((user, i) => `${i + 1}・<@${message.guild.members.cache.get(user).user.id}>`)
                            .slice(p0, p1)
                            )
                            .setFooter(`${page}/${Math.ceil(data.whitelist.length  / 15)}・${client.user.username}`)  
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

        } else {
            return message.lineReply(message.translate.error(this, "args"))

        }
    }
}
