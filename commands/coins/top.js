const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');

module.exports = {
    name: "top",
    aliases: ["leaderboard"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
   
        let lb = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        lb.length = 10;
        var finalLb = "Aucun donné trouvé";
        for (var i in lb) {
          finalLb = `**${lb.indexOf(lb[i])+1}) ${client.users.cache.get(lb[i].ID.split('_')[2])}**\n :coin: ${lb[i].data} \n`;
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor('Top 10 de '+message.guild.name, "https://media.discordapp.net/attachments/858250327056056320/882636925578641458/487.png")
        .setDescription(finalLb)
        .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
               message.lineReply(embed)
            
        
   
    }
}