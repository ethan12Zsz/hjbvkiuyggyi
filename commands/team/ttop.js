const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "ttop",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
      
  
        let lb = db.all().filter(data => data.ID.startsWith(`teamcoins_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        lb.length = 10;
        var finalLb = "Aucun donné trouvé";
        for (var i in lb) {
          lb[i].ID.split('_')[2]
            let ccc = db.get(`teamcoins_${message.guild.id}_${lb[i].ID.split('_')[2]}`)
            let cpp = db.get(`teamscap_${message.guild.id}_${lb[i].ID.split('_')[2]}`)
          finalLb = `${lb.indexOf(lb[i])+1}) **Nom:** ${lb[i].ID.split('_')[2]}\n**Capitaine**: <@${cpp}>\n**Coins**: ${ccc || 0} :coin:\n`;
        }
        
       
        const embed = new Discord.MessageEmbed()
        .setAuthor('Top 10 des team de '+message.guild.name, "https://media.discordapp.net/attachments/858250327056056320/882636925578641458/487.png")
        .setDescription(finalLb)
        .setTimestamp()
        .setColor(data.color)
        .setFooter(client.user.username)

        
              message.lineReply(embed)

        
    }}