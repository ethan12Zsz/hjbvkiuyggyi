const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "roulette",
    aliases: ["rlt"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
     

        let user = message.author;

        function isOdd(num) { 
          if ((num % 2) == 0) return false;
          else if ((num % 2) == 1) return true;
      }
          
      let colour = args[0];
      let money = parseInt(args[1]);
      let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
      
      let random = Math.floor(Math.random() * 37);
      
      let moneyhelp = new Discord.MessageEmbed()
       .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
        .setImage("https://thumbs.gfycat.com/EnchantedIdolizedJunebug-size_restricted.gif")
      .setDescription(`Vous avez mal utilisé la commande: ${data.prefix}roulette <color> <montant>`);
      
      let moneymore = new Discord.MessageEmbed()
       .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
        .setImage("https://thumbs.gfycat.com/EnchantedIdolizedJunebug-size_restricted.gif")
      .setDescription(`Vous pariez plus que vous n'avez`);
      
      let colorbad = new Discord.MessageEmbed()
       .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
        .setImage("https://thumbs.gfycat.com/EnchantedIdolizedJunebug-size_restricted.gif")
      .setDescription(`Sspécifier une couleur | Rouge [1,5x] Noir [2x] Vert [15x]`);
      
      
          if (!colour)  return message.lineReply("Spécifier une couleur (rouge x1.5, noir x2, vert x15");
          colour = colour.toLowerCase()
          if (!money) return message.lineReply(`Vous avez mal utilisé la commande: ${data.prefix}roulette <color> <montant>`); 
          if (money > moneydb) return message.lineReply(`Vous pariez plus que vous n'avez`);
          let tt = new Discord.MessageEmbed()
          .setColor(data.color)
           .setFooter("30 secondes avant le résultat")
           .setImage("https://thumbs.gfycat.com/EnchantedIdolizedJunebug-size_restricted.gif")
         .setDescription(`${user.username} vient de lancer une **roulette** en misant \`${money} coins\` sur __${colour}__ !`);
          message.lineReply(tt)
          if (colour == "n" || colour.includes("noir")) colour = 0;
          else if (colour == "r" || colour.includes("rouge")) colour = 1;
          else if (colour == "v" || colour.includes("vert")) colour = 2;
          else return message.lineReply("Spécifier une couleur | Rouge [1,5x] Noir [2x] Vert [15x]");
          
     
          setTimeout(async () => {
          if (random == 0 && colour == 2) { 
              money *= 15
              db.add(`money_${message.guild.id}_${user.id}`, money)
              let moneyEmbed1 = new Discord.MessageEmbed()
               .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
       
              .setDescription(`Vous avez gagner \`${money} coins\`\nMultiplieur: 15x`);
              message.channel.send(moneyEmbed1)
          } else if (isOdd(random) && colour == 1) { 
              money = parseInt(money * 1.5)
              db.add(`money_${message.guild.id}_${user.id}`, money)
              let moneyEmbed2 = new Discord.MessageEmbed()
               .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
       
              .setDescription(`Vous avez gagner \`${money} coins\`\nMultiplieur: 1.5x`);
              message.channel.send(moneyEmbed2)
          } else if (!isOdd(random) && colour == 0) { 
              money = parseInt(money * 2)
              db.add(`money_${message.guild.id}_${user.id}`, money)
              let moneyEmbed3 = new Discord.MessageEmbed()
               .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
       
              .setDescription(`Vous avez gagner \`${money} coins\`\nMultiplieur: 2x`);
              message.channel.send(moneyEmbed3)
          } else { 
              db.subtract(`money_${message.guild.id}_${user.id}`, money)
              let moneyEmbed4 = new Discord.MessageEmbed()
               .setColor(data.color)
        .setFooter(client.user.username)
        .setTimestamp()
              .setDescription(`Vous avez perdu \`${money} coins\`\nMultiplieur: 0x`);
              message.channel.send(moneyEmbed4)
          }},30000)
    }
}
