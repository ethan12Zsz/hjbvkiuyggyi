const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
    
  let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)

    let embedbank = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
    .setDescription(":coin: Vous n'avez pas d'argent de poche à déposer")

    if(money === 0) return message.lineReply(embedbank)

    db.add(`bank_${message.guild.id}_${user.id}`, money)
    db.subtract(`money_${message.guild.id}_${user.id}`, money)
    let embed5 = new Discord.MessageEmbed()
  .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)
  .setDescription(`:coin: Vous avez déposé **tous vos coins en poche** dans votre banque`);
  message.lineReply(embed5)
  
  } else {
  
  let embed2 = new Discord.MessageEmbed()
  .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)
  .setDescription(`:coin: Précisez un montant à déposer`);
  
  if (!args[0]) {
      return message.lineReply(embed2)
      .catch(err => console.log(err))
  }
  let embed3 = new Discord.MessageEmbed()
  .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)
  .setDescription(`:coin: Vous ne pouvez pas déposer d'argent négatif`);

  if (message.content.includes('-')) { 
      return message.lineReply(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)
  .setDescription(`:coin: Vous n'avez pas beaucoup d'argent de poche`);

  if (member < args[0]) {
      return message.lineReply(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)
  .setDescription(`:coin: Vous avez déposé **${args[0]}** coins dans votre banque`);

  message.lineReply(embed5)
  db.add(`bank_${message.guild.id}_${user.id}`, args[0])
  db.subtract(`money_${message.guild.id}_${user.id}`, args[0])}

       
    
        
           
          
    }
}
