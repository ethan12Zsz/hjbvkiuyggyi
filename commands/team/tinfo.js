const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tinfo",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let team =  args.join(" ")
        if(!team) return message.lineReply(`:x: Merci d'entrer un nom de team valide !`)
     //   db.set(`teamdate${message.guild.id}_${teame}`, Date.parse(new Date)/1000)

     let date = db.get(`teamdate${message.guild.id}_${team}`)
     if(date === null) return message.lineReply(`:x: Merci d'entrer un nom de team valide !`)
        let description = db.get(`teamdes_${message.guild.id}_${team}`)
        if(description === null) return message.lineReply(`:x: Merci d'entrer un nom de team valide !`)
        let coins = db.get(`teamcoins_${message.guild.id}_${team}`)
        if(coins === null) coins = "0"
        let owner = db.get(`teamscap_${message.guild.id}_${team}`)
        if(owner === null) return message.lineReply(`:x: Merci d'entrer un nom de team valide !`)
        let membre = db.get(`teamsnumber_${message.guild.id}_${team}`)
        if(membre === null) membre = "0"
        let lb = db.all().filter(data => data.ID.startsWith(`teammember_${message.guild.id}_${team}`)).sort((a, b) => b.data - a.data)
        lb.length = 10;
        var finalLb = "Aucune membre trouvé";
        for (var i in lb) {
          finalLb = `**${lb.indexOf(lb[i])+1}) ${client.users.cache.get(lb[i].ID.split('_')[3])}** `;
        }
      

     
        const embed = new Discord.MessageEmbed()
        .setTitle(`Info sur la team ${team}`)
        .setDescription(`**Nom:** ${team}\n**Description**: ${description}\n**Capitaine**: <@${owner}>\n**Coins**: ${coins}\n**Date de création**: <t:${date}>\n__Membres (${membre}/10):__\n\n`+finalLb)
        .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
              message.lineReply(embed)

        
    }}