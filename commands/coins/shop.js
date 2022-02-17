const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "shop",
    aliases: ["boutique"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
      let money = await db.get(`money_${message.guild.id}_${message.author.id}`)
      if(money === null ) money = 0
      filter = (reaction, user) => ["🍾","🚘","🏪","📽️","🚆","💰","🎣","⛏️","🔫"].includes(reaction.emoji.name) && user.id === message.author.id,
      dureefiltrer = response => { return response.author.id === message.author.id };

      const embed = new Discord.MessageEmbed()
      embed.setAuthor('Boutique d\'items de '+message.guild.name, "https://media.discordapp.net/attachments/849036131205906503/849336538809630730/shopimg.png")
      embed.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
🍾・Acheter un **bar** pour \`2000 coins\`
🚘・Acheter un **garage** pour \`3000 coins\`
🏪・Acheter un **magasin** pour \`4000 coins\`
📽️・Acheter un **cinéma** pour \`5000 coins\`
🚆・Acheter une **gare** pour\`6500 coins\`
💰・Acheter un **anti-rob** de deux heures pour \`5 points de réputation\`
⛏️・Acheter une **pioche** pour \`1500 coins\`
🎣・Acheter une **canne à pêche** pour \`1500 coins\`
🔫・Acheter un **pistolet** pour \`1500 coins\`
                 `)
    
          
     embed.setTimestamp()
     embed.setColor(data.color)
     embed.setFooter(client.user.username)
        
            message.lineReply(embed).then( async (m) => {
await m.react("🍾")
await sleep(250);
await m.react("🚘")
await sleep(250);
await m.react("🏪")
await sleep(250);
await m.react("📽️")
await sleep(250);
await m.react("🚆")
await sleep(250);
await m.react(`💰`)
await sleep(250);
await m.react("⛏️")
await sleep(250);
await m.react("🎣")
await sleep(250);
await m.react("🔫")
await sleep(250);


const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on("collect", async (reaction, user) => {
if (reaction._emoji.name === "🍾") {
  if(db.get(`bar_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà un **bar** !")
              if(money<=2000) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour un **bar** !")
                if(db.get(`bar_${message.guild.id}_${message.author.id}`) === null) {
              db.set(`bar_${message.guild.id}_${message.author.id}`, true)
db.subtract(`money_${message.guild.id}_${message.author.id}`, 2000)
await message.channel.send("✅ Vous avez acheter un **bar** à \`2000 coins\`")
                 
            } 
                }
                if (reaction._emoji.name === "🚘") {
if(db.get(`gara_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà un **garage** !")
if(money<=3000) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour un **garage** !")

if(db.get(`gara_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`gara_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 3000)
  await message.channel.send("✅ Vous avez acheter un **garage** à \`3000 coins\`")}
                }
                if (reaction._emoji.name === "🏪") {
if(db.get(`maga_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà un **magasin** !")
if(money<=4000) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour un **magasin** !")

if(db.get(`maga_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`maga_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 4000)
  await message.channel.send("✅ Vous avez acheter un **magasin** à \`4000 coins\`")}
                }
                if (reaction._emoji.name === "📽️") {
if(db.get(`cine_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà un **cinéma** !")
if(money<=5000) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour un **cinéma** !")

if(db.get(`cine_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`cine_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 5000)
  await message.channel.send("✅ Vous avez acheter un **cinéma** à \`5000 coins\`")}
                }
                if (reaction._emoji.name === "🚆") {
if(db.get(`gare_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà une **gare** !")
if(money<=6500) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour une **gare** !")

if(db.get(`gare_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`gare_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 6500)
  await message.channel.send("✅ Vous avez acheter un **gare** à \`6500 coins\`")}
                }
            
                
                if (reaction._emoji.name === "⛏️") {
if(db.get(`pick_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà une **pioche** !")
if(money<=1500) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour une **pioche** !")

if(db.get(`pick_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`pick_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 1500)
  await message.channel.send("✅ Vous avez acheter une **pioche** à \`1500 coins\`")}
                }
                if (reaction._emoji.name === "​​💰") {
let rep = db.get(`rep_${message.guild.id}_${user.id}`)
if(rep === null) rep = "0"
if(db.get(`antirob_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà un **antirob** !")
          if(rep<=5) await message.channel.send(":x: Vous n'avez assez de points de réputation pour un **antirob** !")

if(db.get(`antirob_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`antirob_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`rep_${message.guild.id}_${message.author.id}`, 5)  
  
  await message.channel.send("✅ Vous avez acheter un **antirob** à \`5 points de réputation\`")}
                }
                if (reaction._emoji.name === "🔫") {
if(db.get(`gun_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà un **pistolet** !")
if(money<=1500) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour un **pistolet** !")

if(db.get(`gun_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`gun_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 1500)
  await message.channel.send("✅ Vous avez acheter un **gun** à \`1500 coins\`")} 
                }
                if (reaction._emoji.name === "🎣") {
if(db.get(`fishingrob_${message.guild.id}_${message.author.id}`) === true) return await message.channel.send(":x: Vous avez déjà une **canne à pêche** !")
if(money<=1500) return await message.channel.send(":x: Vous n'avez assez de coins en poche pour une **canne à pêche** !")

if(db.get(`fishingrob_${message.guild.id}_${message.author.id}`) === null) {
                db.set(`fishingrob_${message.guild.id}_${message.author.id}`, true)
  db.subtract(`money_${message.guild.id}_${message.author.id}`, 1500)
  await message.channel.send("✅ Vous avez acheter une **canne à pêche** à \`1500 coins\`")} 
                }
             
     

              
              await reaction.users.remove(message.author.id);
                
               })})
    }
}