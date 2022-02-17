
const Discord = require("discord.js");
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "setprofil",
    aliases: ["setprofile"],
    cooldown: 10000,
    ownerOnly: true,
    userPermissions: [],
    whitelistOnly: false,
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],    
        async execute(client, message, args, data) {
            if(client.config.owners.includes(message.author.id)) {

        let msg = await message.lineReply(message.translate.owner.setprofile.loading)
        const embed = new Discord.MessageEmbed()

        embed.setTitle(message.translate.owner.setprofile.title)
        embed.setTimestamp()
        embed.setColor(data.color)
        embed.setFooter(client.user.username )
    
        embed.setDescription(message.translate.owner.setprofile.descriptione)

        await msg.react('1️⃣')
        await sleep(250);
        await msg.react('2️⃣')
        await sleep(250);
        await msg.react('3️⃣')
        await sleep(250);
        await msg.react('4️⃣')
        await sleep(250);
        await msg.react('❌').then(async (m) => {
        await sleep(250);

            msg.edit(" ", embed)

            let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "1️⃣") {
                    updateEmbed()
                    let question = await message.lineReply(message.translate.owner.setprofile.question[0].question)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        client.user.setUsername(collected.first().content).then(async () => {
                            updateEmbed()
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.lineReply(message.translate.owner.setprofile.question[0].error).then((mm) => mm.delete({
                                timeout: 2500
                            }));
                        })
                    })
                }
                if (reaction._emoji.name === "2️⃣") {
                    let question = await message.lineReply(message.translate.owner.setprofile.question[1].question)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        client.user.setAvatar(collected.first().content).then(async () => {
                            updateEmbed()
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.lineReply(message.translate.owner.setprofile.question[1].error).then((mm) => mm.delete({
                                timeout: 2500
                            }));
                        })
                    })
                }

                if (reaction._emoji.name === "3️⃣") {
                    let question = await message.lineReply(message.translate.owner.setprofile.question[2].question)
                    const filter = m => message.author.id === m.author.id;

                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        let type = ""

                        if (collected.first().content.toLowerCase().startsWith("play")) {
                            type = "PLAYING"
                        } else if (collected.first().content.toLowerCase().startsWith("stream")) {
                            type = "STREAMING"
                        } else if (collected.first().content.toLowerCase().startsWith("listen")) {
                            type = "LISTENING"
                        } else if (collected.first().content.toLowerCase().startsWith("watch")) {
                            type = "WATCHING"
                        } else {
                            return message.lineReply(message.translate.owner.setprofile.question[2].error)
                        }

                        let question2 = await message.lineReply(message.translate.owner.setprofile.question[3].question)

                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected2) => {
                            collected2.first().delete()
                            question2.delete()

                            client.user.setActivity(collected2.first().content, { type: type, url: "https://www.twitch.tv/leaaa93" }).then(async (a) => {
                                updateEmbed()
                            })
                        });
                    })
                }
                if (reaction._emoji.name === "4️⃣") {
                    let question = await message.lineReply(`4️⃣・Quel presence voulez-vous attribuez au bot ? (\`dnd\`, \`idle\`, \`online\`)`)
                    const filter = m => message.author.id === m.author.id;

                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        let type = ""

                        if (collected.first().content.toLowerCase().startsWith("dnd")) {
                            type = "dnd"   
                        } else if (collected.first().content.toLowerCase().startsWith(" ")) {
                            type = "idle"                       
                        } else if (collected.first().content.toLowerCase().startsWith("online")) {
                            type = "online"
                         }  else {
                            return message.lineReply(`:x: Je n'ai pas pu changer ma presence :/`)
                        }
                        client.user.setPresence({ status: type }).then(async (a) => {
                                updateEmbed()
                            })
                        });
                   
                }
                if (reaction._emoji.name === "❌") {
                    msg.delete()
                }
                await reaction.users.remove(message.author.id);
            })

            function updateEmbed() {
                embed.setDescription(message.translate.owner.setprofile.descriptione)
                msg.edit(embed)
            }
        });

    } else {
        return message.lineReply(`:x: Vous devez avoir les niveaux d'autorisation \`CréateurOnly\` pour faire cette commande.`)
    }
    }
}