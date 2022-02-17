const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "setgain",
    aliases: ["setgains"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        filter = (reaction, user) => ["1️⃣",'2️⃣',"3️⃣", "4️⃣"].includes(reaction.emoji.name) && user.id === message.author.id,
        dureefiltrer = response => { return response.author.id === message.author.id };
      let money = await db.get(`money_${message.guild.id}_${message.author.id}`)
      if(money === null ) money = 0
     
      const embed = new Discord.MessageEmbed()
      embed.setTitle('Paramètre des récompense')
      embed.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
1️⃣・Changer les récompense vocal (coins/temps)
2️⃣・Changer le nombre de coins gagné par message
3️⃣・Changer le nombre de coins gagné par lancement de caméra
4️⃣・Changer le nombre de coins gagné par lancement de stream
5️⃣・Changer les récompense des batiment (coins/temps)


                 `)
    
          
     embed.setTimestamp()
     embed.setColor(data.color)
     embed.setFooter(client.user.username)
        
            message.lineReply(embed).then( async (m) => {
await m.react("1️⃣")
await sleep(250);
await m.react("2️⃣")
await sleep(250);
await m.react("3️⃣")
await sleep(250);
await m.react("4️⃣")
await sleep(250);
await m.react("5️⃣")
await sleep(250);



                let collector = m.createReactionCollector((reaction, user) => user.id === message.author.id);
                collector.on("collect", async (reaction, user) => {
if (reaction._emoji.name === "1️⃣") {
    message.channel.send(`Veuillez entrer le **nombre de coins gagné** en vocal. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
        .then(cld => {
            if(cld.first().content === "non") {
                mp.delete()
                cld.first().delete()
                db.set(`msg_${message.guild.id}`, null)

                
            }else {
        var msg = cld.first();
        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
        
        mp.delete()
        cld.first().delete()
                                                  
        db.set(`voc_${message.guild.id}`, msg.content)
            }
       
        message.channel.send(`Veuillez entrer le **temps d'interval** en minute pour les gain vocal. (*Mettez \`non\` pour le mettre par default*)`).then(mpe => {
            mpe.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
            .then(cld2 => {
                if(cld2.first().content === "non") {
                    db.set(`voc_${message.guild.id}`, null)
                    mpe.delete()
                    cld2.first().delete()
                }else {
                    if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);

                    db.set(`temps_${message.guild.id}`, cld2.first().content)
                    mpe.delete()
                    cld2.first().delete()
                }
                })})
;})
        });
    
                }
                if (reaction._emoji.name === "2️⃣") {
                    message.channel.send(`Veuillez entrer le **nombre de coins gagné** par message. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                        .then(cld => {
                            if(cld.first().content === "non") {
                                mp.delete()
                                cld.first().delete()
                                db.set(`msg_${message.guild.id}`, null)

                                return;
                            } else {
                        var msg = cld.first();
                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                        
                        mp.delete()
                        cld.first().delete()
                                                                  
                        db.set(`msg_${message.guild.id}`, msg.content)
                            }
                       
                ;})
                        });
                    
                                }
                                if (reaction._emoji.name === "3️⃣") {
                                    message.channel.send(`Veuillez entrer le **nombre de coins gagné** par lancement d"une caméra. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                                        .then(cld => {
                                            if(cld.first().content === "non") {
                                                mp.delete()
                                                cld.first().delete()
                                                db.set(`cam_${message.guild.id}`, null)

                                                return;
                                            } else {
                                        var msg = cld.first();
                                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                                        
                                        mp.delete()
                                        cld.first().delete()
                                                                                  
                                        db.set(`cam_${message.guild.id}`, msg.content)
                                      
                                            }
                                ;})
                                        });
                                    
                                                }
                                                if (reaction._emoji.name === "4️⃣") {
                                                    message.channel.send(`Veuillez entrer le **nombre de coins gagné** par lancement d"un stream. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                                                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                                                        .then(cld => {
                                                            if(cld.first().content === "non") {
                                                                mp.delete()
                                                                cld.first().delete()
                                                                db.set(`stream_${message.guild.id}`, null)

                                                                return;
                                                            }else {
                                                        var msg = cld.first();
                                                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                                                        
                                                        mp.delete()
                                                        cld.first().delete()
                                                                                                  
                                                        db.set(`stream_${message.guild.id}`, msg.content)
                                                            }
                                                       
                                                ;})
                                                        }) }
                                                         if(reaction._emoji.name === "5️⃣"){
                  let slm = new Discord.MessageEmbed()
                  slm.setTitle(`・・・・・`)
                  slm.setTimestamp()
                  slm.setColor(data.color)
                  slm.setFooter(client.user.username )
              
                  slm.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
                  ​🍾・Configurer le salaire **d'un bar**
                  🚘・Configurer le salaire **d'un garage**
                  🏪・Configurer le salaire **d'un magasin**
                  📽️・Configurer le salaire **d'un cinéma**
                  🚆・Configurer le salaire **d'une gare**

                 `)
              
               
          
                 await message.channel.send(slm).then(async questione => {
              
                  await questione.react('🍾')
await sleep(250);
await questione.react('🚘')
await sleep(250);
await questione.react('🏪')
await sleep(250);
await questione.react('📽️')
await sleep(250);
await questione.react('🚆')

await sleep(250).then(async (m) => {


          let collector2 = questione.createReactionCollector((r, member) => member.id === message.author.id);
          collector2.on("collect", async (r, member) => {
              if (r._emoji.name === "🍾") {
                message.channel.send(`Veuillez entrer un **salaire (coins)**. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                    mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                    .then(cld => {
                        if(cld.first().content === "non") {
                            mp.delete()
                            cld.first().delete()
                            db.set(`barcoins_${message.guild.id}`, null)

                            
                        } else {
                    var msg = cld.first();
                    if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                    
                    mp.delete()
                    cld.first().delete()
                                                              
                    db.set(`barcoins_${message.guild.id}`, msg.content)
                  
                        }
                    message.channel.send(`Veuillez entrer le **temps d'interval** en minute pour gagné le salaire. (*Mettez \`non\` pour le mettre par default*)`).then(mpe => {
                        mpe.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                        .then(cld2 => {
                            if(cld2.first().content === "non") {
                                db.set(`bartemps_${message.guild.id}`, null)
                                mpe.delete()
                                cld2.first().delete()
                            }else {
                                if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
            
                                db.set(`bartemps_${message.guild.id}`, cld2.first().content)
                                mpe.delete()
                                cld2.first().delete()
                               
                            }
                            })})
            ;})
                    });
                           }
              
                if (r._emoji.name === "🚘") {
                    message.channel.send(`Veuillez entrer un **salaire (coins)**. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                        .then(cld => {
                            if(cld.first().content === "non") {
                                mp.delete()
                                cld.first().delete()
                                db.set(`garacoins_${message.guild.id}`, null)
    
                                
                            }else {
                        var msg = cld.first();
                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                        
                        mp.delete()
                        cld.first().delete()
                                                                  
                        db.set(`garacoins_${message.guild.id}`, msg.content)
                            }
                       
                        message.channel.send(`Veuillez entrer le **temps d'interval** en minute pour gagné le salaire. (*Mettez \`non\` pour le mettre par default*)`).then(mpe => {
                            mpe.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                            .then(cld2 => {
                                if(cld2.first().content === "non") {
                                    db.set(`garatemps_${message.guild.id}`, null)
                                    mpe.delete()
                                    cld2.first().delete()
                                }else {
                                    if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                
                                    db.set(`garatemps_${message.guild.id}`, cld2.first().content)
                                    mpe.delete()
                                    cld2.first().delete()
                                   
                                }
                                })})
                ;})
                        });
                  }
 

                if (r._emoji.name === "🏪") {
                    message.channel.send(`Veuillez entrer un **salaire (coins)**. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                        .then(cld => {
                            if(cld.first().content === "non") {
                                mp.delete()
                                cld.first().delete()
                                db.set(`magacoins_${message.guild.id}`, null)
    
                                
                            }else {
                        var msg = cld.first();
                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                        
                        mp.delete()
                        cld.first().delete()
                                                                  
                        db.set(`magacoins_${message.guild.id}`, msg.content)
                            }
                       
                        message.channel.send(`Veuillez entrer le **temps d'interval** en minute pour gagné le salaire. (*Mettez \`non\` pour le mettre par default*)`).then(mpe => {
                            mpe.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                            .then(cld2 => {
                                if(cld2.first().content === "non") {
                                    db.set(`magatemps_${message.guild.id}`, null)
                                    mpe.delete()
                                    cld2.first().delete()
                                }else {
                                    if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                
                                    db.set(`magatemps_${message.guild.id}`, cld2.first().content)
                                    mpe.delete()
                                    cld2.first().delete()
                                   
                                }
                                })})
                ;})
                        });}
                if (r._emoji.name === "📽️") {
                    message.channel.send(`Veuillez entrer un **salaire (coins)**. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                        .then(cld => {
                            if(cld.first().content === "non") {
                                mp.delete()
                                cld.first().delete()
                                db.set(`cinecoins_${message.guild.id}`, null)
    
                                
                            }else {
                        var msg = cld.first();
                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                        
                        mp.delete()
                        cld.first().delete()
                                                                  
                        db.set(`cinecoins_${message.guild.id}`, msg.content)
                      
                            }
                        message.channel.send(`Veuillez entrer le **temps d'interval** en minute pour gagné le salaire. (*Mettez \`non\` pour le mettre par default*)`).then(mpe => {
                            mpe.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                            .then(cld2 => {
                                if(cld2.first().content === "non") {
                                    db.set(`cinetemps_${message.guild.id}`, null)
                                    mpe.delete()
                                    cld2.first().delete()
                                }else {
                                    if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                
                                    db.set(`cinetemps_${message.guild.id}`, cld2.first().content)
                                    mpe.delete()
                                    cld2.first().delete()
                                   
                                }
                                })})
                ;})
                        });              
                }
                if (r._emoji.name === "🚆") {
                    message.channel.send(`Veuillez entrer un **salaire (coins)**. (*Mettez \`non\` pour le mettre par default*)`).then(mp => {
                        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                        .then(cld => {
                            if(cld.first().content === "non") {
                                mp.delete()
                                cld.first().delete()
                                db.set(`garecoins_${message.guild.id}`, null)
    
                                
                            }else {
                        var msg = cld.first();
                        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                        
                        mp.delete()
                        cld.first().delete()
                                                                  
                        db.set(`garecoins_${message.guild.id}`, msg.content)
                            }
                       
                        message.channel.send(`Veuillez entrer le **temps d'interval** en minute pour gagné le salaire. (*Mettez \`non\` pour le mettre par default*)`).then(mpe => {
                            mpe.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                            .then(cld2 => {
                                if(cld2.first().content === "non") {
                                    db.set(`garetemps_${message.guild.id}`, null)
                                    mpe.delete()
                                    cld2.first().delete()
                                }else {
                                    if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
                
                                    db.set(`garetemps_${message.guild.id}`, cld2.first().content)
                                    mpe.delete()
                                    cld2.first().delete()
                                   
                                }
                                })})
                ;})
                        });
                }
              
              r.users.remove(message.author.id);

            })})
                                                          })  }
                                                
                                                                

              
              await reaction.users.remove(message.author.id);
                
               })})
    }
}