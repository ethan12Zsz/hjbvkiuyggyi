const {MessageEmbed} = require("discord.js")
const db = require('quick.db');

const ms = require("parse-ms")

module.exports = {
    name: "coinflip",
    aliases: ["flip"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
        let cooldown = 3.6e+6; 
    
        if (!args[0]) return message.lineReply(message.translate.error(this, "args"))

        let timeout = 1800000;

          let argsoutcome = args[0];
          let money = args[1];
    
       
    
          let userMoney = db.get(`money_${message.guild.id}_${message.author.id}`);
    
    
          if (money > userMoney) {
            return message.lineReply("Vous avez moins d'argent en poche que vous ne voulez parier :coin:")
          }
    
          let outcomes = [
            'pile',
            'face'
          ];
          let outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    
    
          let result;
          if (outcome.toLowerCase() === argsoutcome.toLowerCase()) {
            result = `Toutes nos félicitations! Vous avez gagné le pari.\nVous avez gagné \`${money} coins\` :coin:`;
    
            db.add(`money_${message.guild.id}_${message.author.id}`, money)
    
          } else {
            result = 'Désolé, vous avez perdu le pari. Plus de chance la prochaine fois.';
    
            db.subtract(`money_${message.guild.id}_${message.author.id}`, money)
          }
          const embed = new MessageEmbed()
          .setColor(data.color)
          .setFooter(client.user.username)
          .setTimestamp()
            .setTitle(`Résultat: ${outcome}`)
            .setDescription(result)
            .setImage("https://media3.giphy.com/media/xUNd9KuqkEuWwgZ9u0/giphy.gif")
          await message.lineReply({ embed
          }).catch(e => {
            return message.lineReply(`ERROR:\n\```${error.message}\````);
          });
          
    
          
        
      
           
          
    }
}
