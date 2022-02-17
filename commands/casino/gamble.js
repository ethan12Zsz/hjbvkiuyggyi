const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "gamble",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
   
      

        let author = db.fetch(`money_${message.guild.id}_${message.author.id}`)

      
        
        const input = args[0]
        if (!input) {
            message.lineReply('Spécifier un montant')
            return
        }
        if (input < 1) {
            message.lineReply('Spécifier un montant')
            return
        }
        if (isNaN(input)) {
            message.lineReply('Spécifier un montant')
            return
        }

       if (author < input) {
        return message.lineReply(`Vous pariez plus que vous n'avez`);
       }

        const key1 = Math.round(Math.random() * input + 1)
        const key2 = Math.round(Math.random() * input * -1 - 1)
        const key3 = Math.round(Math.random() * input + Math.sqrt(input) / input)
        const key4 = Math.round(Math.random() * input * -1 + Math.sqrt(input) / input)

        let output = Math.round(key1 + key2 + key3 + key4)

        let extOutput = 0
        if (output >= input) {
            extOutput = Math.round(output * 1.71)
        } else if (output > 32) {
            extOutput = Math.round(output / input) + output
        } else if (output > 0) {
            extOutput = Math.round(output * Math.random()) + output
        }

        if (output < input * -1) {
            output = input * -1
        }

        let finOutput = 0
        if (extOutput === 0) {
            finOutput = output
        } else {
            finOutput = extOutput
        }

        let result = 0
        let bRes = 0
        if (input < 25 && finOutput > input / 2) {
            result = Math.round(input / 3)
        } else {
            result = finOutput
        }
        bRes = result

        let colorSet = data.color
        let gambleResult = 'Résultat de votre paries' 
        let gambleEnd = 'Vous avez perdu' 
        if (bRes > 0) {
            result === bRes - input
            colorSet = data.color
            gambleResult = 'Résultat de votre paries' 
            gambleEnd = 'Vous avez gagner' 
        }

        if (key1 >= 0.98 && input >= 100) {
            result === Math.round(input / 10 * input)
        }


        const gambleEmbed = new Discord.MessageEmbed()
            .setColor(colorSet)
            .setTitle(gambleResult)
            .setDescription(`${gambleEnd} **${result}** coins :coin:`)
            .setTimestamp()
            .setFooter(client.user.username)
           .setImage("https://thumbs.gfycat.com/PersonalSoreIbadanmalimbe-size_restricted.gif")

        message.lineReply(gambleEmbed)
           
          
    }
}
