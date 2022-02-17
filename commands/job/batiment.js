const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "batiment",
    aliases: ["bat"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
      let member = await db.get(`moneyBAT_${message.guild.id}_${message.author.id}`)
      if(member === null) member = "0"
      let bar = db.get(`bar_${message.guild.id}_${message.author.id}`)
      if(bar === null) bar = "Non Possédé"  
      if(bar === true) bar = "Possédé"  
      let gara = db.get(`gara_${message.guild.id}_${message.author.id}`)
      if(gara === null) gara = "Non Possédé"  
      if(gara === true) gara = "Possédé"  
      let maga = db.get(`maga_${message.guild.id}_${message.author.id}`)
      if(maga === null) maga = "Non Possédé"  
      if(maga === true) maga = "Possédé"  
      let cine = db.get(`cine_${message.guild.id}_${message.author.id}`)
      if(cine === null) cine = "Non Possédé"  
      if(cine === true) cine = "Possédé"  
      let gare = db.get(`gare_${message.guild.id}_${message.author.id}`)
      if(gare === null) gare = "Non Possédé"  
      if(gare === true) gare = "Possédé"  
      let barcoins = db.get(`barcoins_${message.guild.id}`)
            if(barcoins === null) barcoins = "100"
            let bartemps = db.get(`bartemps_${message.guild.id}`)
            if(bartemps === null) bartemps = "120"
            let garacoins = db.get(`garacoins_${message.guild.id}`)
            if(garacoins === null) garacoins = "200"
            let garatemps = db.get(`garatemps_${message.guild.id}`)
            if(garatemps === null) garatemps = "120"
            let magacoins = db.get(`magacoins_${message.guild.id}`)
            if(magacoins === null) magacoins = "300"
            let magatemps = db.get(`magatemps_${message.guild.id}`)
            if(magatemps === null) magatemps = "120"
            let cinecoins = db.get(`cinecoins_${message.guild.id}`)
            if(cinecoins === null) cinecoins = "400"
            let cinetemps = db.get(`cinetemps_${message.guild.id}`)
            if(cinetemps === null) cinetemps = "120"
            let garecoins = db.get(`garecoins_${message.guild.id}`)
            if(garecoins === null) garecoins = "500"
            let garetemps = db.get(`garetemps_${message.guild.id}`)
            if(garetemps === null) garetemps = "120"
        const embed = new Discord.MessageEmbed()
        .setTitle(`Argent dans votre entrepôt: ${member} / 5000 `)
        .setDescription(`Veuillez choisir les actions avec les réactions suivantes:\n📤・Récupérer l'argent des batiments\n📞・Vendre un batiment\n\n\`\`\`             \n         \`\`\`\n\n**Bar**: ${bar} (${barcoins}coins/${bartemps}m)\n**Garage**: ${gara} (${garacoins}coins/${garatemps}m)\n**Magasin**: ${maga} (${magacoins}coins/${magatemps}m)\n**Cinéma**: ${cine} (${cinecoins}coins/${cinetemps}m)\n**Gare**: ${gare} (${garecoins}coins/${garetemps}m)\n\n*Utilisez la commande \`shop\` pour acheter un ou plusieurs batiments !*



       `).setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
               message.lineReply(embed).then(m => {

                m.react("📤")
                m.react("📞")

                let collector = m.createReactionCollector((reaction, user) => user.id === message.author.id);
                collector.on("collect", async (reaction, user) => {
                  if (reaction._emoji.name === "📤") {
                    if( db.get(`moneyBAT_${message.guild.id}_${message.author.id}`) === null || 0) return message.channel.send("📤 Vous n'avez pas d'argent de batiments.")
                    db.add(`money_${message.guild.id}_${message.author.id}`, member)
                    db.subtract(`moneyBAT_${message.guild.id}_${message.author.id}`,member)
                    await message.channel.send("✅ Vous avez bien récupérer l'argent des batiments.")
                    
                    const embede = new Discord.MessageEmbed()
                    .setTitle(`Argent dans votre entrepôt: 0 / 5000 `)
                    .setDescription(`Veuillez choisir les actions avec les réactions suivantes:\n📤・Récupérer l'argent des batiments\n📞・Vendre un batiment\n\n\`\`\`             \n         \`\`\`\n\n**Bar**: ${bar} (${barcoins}coins/${bartemps}m)\n**Garage**: ${gara} (${garacoins}coins/${garatemps}m)\n**Magasin**: ${maga} (${magacoins}coins/${magatemps}m)\n**Cinéma**: ${cine} (${cinecoins}coins/${cinetemps}m)\n**Gare**: ${gare} (${garecoins}coins/${garetemps}m)\n\n*Utilisez la commande \`shop\` pour acheter un ou plusieurs batiments !*
                    `).setTimestamp()
                    .setColor(data.color)
                    .setFooter(client.user.username)
m.edit(embede)
                }
                if (reaction._emoji.name === "📞") {
                  let embede = new Discord.MessageEmbed()
                  embede.setTitle(`Choisissez le batiments que vous voulez vendre`)
                  embede.setTimestamp()
                  embede.setColor(data.color)
                  embede.setFooter(client.user.username )
              
                  embede.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
                  ​🍾・Vendre un bar et récupérer \`1500 coins\`
                  🚘・Vendre un garage et récupérer \`2500 coins\`
                  🏪 ・Vendre un magasin et récupérer \`3500 coins\`
                  📽️・Vendre un cinéma et récupérer \`4500 coins\`
                  🚆・Vendre une gare et récupérer \`6000 coins\`

                 `)
              
               
          
                  let questione = await message.channel.send(embede)
              
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
                if(db.get(`bar_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de bar !")
              
                if(db.get(`bar_${message.guild.id}_${message.author.id}`) === true) {
              db.set(`bar_${message.guild.id}_${message.author.id}`, null)
                  db.add(`money_${message.guild.id}_${message.author.id}`, 1500)
                  await message.channel.send("✅ Vous avez vendu votre **bar** \`1500 coins\`")
                 

 
 questione.delete()               }}
              
                if (r._emoji.name === "🚘") {
                  if(db.get(`gara_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de garage !")
              
                  if(db.get(`gara_${message.guild.id}_${message.author.id}`) === true) {
                db.set(`gara_${message.guild.id}_${message.author.id}`, null)
                    db.add(`money_${message.guild.id}_${message.author.id}`, 2500)
                    await message.channel.send("✅ Vous avez vendu votre **garage** \`2500 coins\`")
                   
                  }
 
 questione.delete()               }
                if (r._emoji.name === "🏪") {
                  if(db.get(`maga_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de magasin !")
              
                  if(db.get(`maga_${message.guild.id}_${message.author.id}`) === true) {
                db.set(`maga_${message.guild.id}_${message.author.id}`, null)
                    db.add(`money_${message.guild.id}_${message.author.id}`, 3500)
                    await message.channel.send("✅ Vous avez vendu votre **magasin** \`3500 coins\`")
                   
                  }  
                questione.delete()              }
                if (r._emoji.name === "📽️") {
                  if(db.get(`cine_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de cinéma !")
              
                  if(db.get(`cine_${message.guild.id}_${message.author.id}`) === true) {
                db.set(`cine_${message.guild.id}_${message.author.id}`, null)
                    db.add(`money_${message.guild.id}_${message.author.id}`, 4500)
                    await message.channel.send("✅ Vous avez vendu votre **cinéma** \`4500 coins\`")
                 
                  }
                  questione.delete()                
                }
                if (r._emoji.name === "🚆") {
                  if(db.get(`gare_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de gare !")
              
                  if(db.get(`gare_${message.guild.id}_${message.author.id}`) === true) {
                db.set(`gare_${message.guild.id}_${message.author.id}`, null)
                    db.add(`money_${message.guild.id}_${message.author.id}`, 6000)
                    await message.channel.send("✅ Vous avez vendu votre **gare** \`6000 coins\`")
                 
                  }
                  questione.delete() 
                }
              
              r.users.remove(message.author.id);

            })})
               
     

              }
              reaction.users.remove(message.author.id);
                })
               })
    }
}