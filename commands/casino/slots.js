const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");
const slotItems = ["🍇", 
"🍉", 
"🍊",
 "🍎", 
 "7️⃣", 
 "🍓", 
 "🍒"];
module.exports = {
    name: "slots",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
      

        let user = message.author;
        let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
        let money = parseInt(args[0]);
        let win = false;
    
        let tttt = new Discord.MessageEmbed()
        .setColor(data.color)
      .setFooter("5 secondes avant le résultat")
      .setImage("https://media.tenor.com/images/01f2fce15461365c59981176ece3791d/tenor.gif")
      .setDescription(`${user.username} vient de lancer la **machine à sous** en misant \`${money} coins\` !`);
      message.lineReply(tttt)
        if (!money) return message.lineReply(`Spécifier un montant`);
        if (money > moneydb) return message.lineReply(`Vous pariez plus que vous n'avez`);
    
        let number = []
        for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
    
        if (number[0] == number[1] && number[1] == number[2]) { 
            money *= 9
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
            money *= 2
            win = true;
        }
      
      setTimeout(async () => {

        if (win) {
            let slotsEmbed1 = new Discord.MessageEmbed()
                .setDescription(`\`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\`\n\nVous gagnez \`${money} coins\` !`)
                  .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()

            message.channel.send(slotsEmbed1)
            db.add(`money_${message.guild.id}_${user.id}`, money)
        } else {
            let slotsEmbed = new Discord.MessageEmbed()
                .setDescription(`\`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\`\n\nVous perdez \`${money} coins\` !`)
                  .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
            message.channel.send(slotsEmbed)
            
            db.subtract(`money_${message.guild.id}_${user.id}`, money)
        }
    },5000)
    
        
           
          
    }
}
