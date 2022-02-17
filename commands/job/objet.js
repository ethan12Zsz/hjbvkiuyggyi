const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "objet",
    aliases: ["obj"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let antirob = db.get(`antirob_${message.guild.id}_${message.author.id}`)
      if(antirob === null) antirob = "Non Actif"  
      if(antirob === true) antirob = "Actif"  
      let pick = db.get(`pick_${message.guild.id}_${message.author.id}`)
      if(pick === null) pick = "Non Possédé"  
      if(pick === true) pick = "Possédé" 
      let gun = db.get(`gun_${message.guild.id}_${message.author.id}`)
      if(gun === null) gun = "Non Possédé"  
      if(gun === true) gun = "Possédé" 
      let fishingrob = db.get(`fishingrob_${message.guild.id}_${message.author.id}`)
      if(fishingrob === null) fishingrob = "Non Possédé"  
      if(fishingrob === true) fishingrob = "Possédé" 
     
        const embed = new Discord.MessageEmbed()
        .setTitle(`Paramètre des objet`)
        .setDescription(`Veuillez choisir les actions avec les réactions suivantes:\n📞・Vendre un objet\n\n\`\`\`             \n         \`\`\`\n\n**Anti-rob**: ${antirob}\n**Pioche**: ${pick}\n**Canne à pêche**: ${fishingrob}\n**Pistolet**: ${gun}\n\n*Utilisez la commande \`shop\` pour acheter un ou plusieurs objet !*



       `).setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
               message.lineReply(embed).then(m => {

                m.react("📞")

                let collector = m.createReactionCollector((reaction, user) => user.id === message.author.id);
                collector.on("collect", async (reaction, user) => {

                if (reaction._emoji.name === "📞") {
                  let embede = new Discord.MessageEmbed()
                  embede.setTitle(`Choisissez l'objet que vous voulez vendre`)
                  embede.setTimestamp()
                  embede.setColor(data.color)
                  embede.setFooter(client.user.username )
              
                  embede.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
                  ​💰・Vendre votre anti-rob et récupérer \`500 coins\`
                  ⛏️・Vendre votre pioche et récupérer \`1000 coins\`
                  🎣・Vendre votre canne à pêche et récupérer \`1000 coins\`
                  🔫・Vendre votre pistolet et récupérer \`1000 coins\`

                 `)
              
               
          
                  let questione = await message.lineReply(embede)
              
                  await questione.react('💰')
await sleep(250);
await questione.react('⛏️')
await sleep(250);
await questione.react('🎣')
await sleep(250);
await questione.react('🔫')
await sleep(250)
.then(async (m) => {


          let collector2 = questione.createReactionCollector((r, member) => member.id === message.author.id);
          collector2.on("collect", async (r, member) => {
            if (r._emoji.name === "🔫") {
                if(db.get(`gun_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de Pistolet !")
              
                if(db.get(`gun_${message.guild.id}_${message.author.id}`) === true) {
              db.set(`gun_${message.guild.id}_${message.author.id}`, null)
                  db.add(`money_${message.guild.id}_${message.author.id}`, 1000)
                  await message.channel.send("✅ Vous avez vendu votre **Pistolet** à \`1000 coins\`")
                 

 
 questione.delete()               }
              
               
              }
            if (r._emoji.name === "🎣") {
                if(db.get(`fishingrob_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de canne à pêche !")
              
                if(db.get(`fishingrob_${message.guild.id}_${message.author.id}`) === true) {
              db.set(`fishingrob_${message.guild.id}_${message.author.id}`, null)
                  db.add(`money_${message.guild.id}_${message.author.id}`, 1000)
                  await message.channel.send("✅ Vous avez vendu votre **canne à pêche** à \`1000 coins\`")
                 

 
 questione.delete()               }
              
               
              }
            if (r._emoji.name === "⛏️") {
                if(db.get(`pick_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas de pioche !")
              
                if(db.get(`pick_${message.guild.id}_${message.author.id}`) === true) {
              db.set(`pick_${message.guild.id}_${message.author.id}`, null)
                  db.add(`money_${message.guild.id}_${message.author.id}`, 1000)
                  await message.channel.send("✅ Vous avez vendu votre **pioche** à \`1000 coins\`")
                 

 
 questione.delete()               }
              
               
              }
              if (r._emoji.name === "💰") {
                if(db.get(`antirob_${message.guild.id}_${message.author.id}`) === null) return await message.channel.send(":x: Vous n'avez pas d'antirob !")
              
                if(db.get(`antirob_${message.guild.id}_${message.author.id}`) === true) {
              db.set(`antirob_${message.guild.id}_${message.author.id}`, null)
                  db.add(`money_${message.guild.id}_${message.author.id}`, 500)
                  await message.channel.send("✅ Vous avez vendu votre **antirob** à \`500 coins\`")
                 

 
 questione.delete()               }
              
               
              }
              r.users.remove(message.author.id);

            })})
               
     

              }
              reaction.users.remove(message.author.id);
                })
               })
    }
}