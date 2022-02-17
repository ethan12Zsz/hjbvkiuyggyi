const talkedRecently = new Set();
const Discord = require("discord.js")
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: "job",
    aliases: ["work"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
      let user = message.author;
      let hrandom = Math.floor(Math.random() * (700));
      let timeout = 86400000;
      let work = await db.fetch(`work_${message.guild.id}_${user.id}`);
  
      if (work !== null && timeout - (Date.now() - work) > 0) {
        let time = ms(timeout - (Date.now() - work));
  
        message.lineReply(`:x: Vous avez déjà travailler, re essayer dans **${time.hours}h** **${time.minutes}**m **${time.seconds}**s`)

      } else {
        db.set(`work_${message.guild.id}_${user.id}`, `${Date.now()}`);
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Choisissez votre travail")
        
        embed.setDescription(
           `Veuillez choisir les actions avec les réactions suivantes:
           👨‍💻・Développeur
           😀・Youtubeur
           👮・Officier de Police
           🦹‍♂️・Criminelle
        `
          )
         
          
          embed.setFooter("Vous ne pouvez réagir qu'une seule fois.")
          embed.setColor(data.color)
          embed.setTimestamp()
  
        const dev = new Discord.MessageEmbed()
        dev.setTitle("👨‍💻・Développeur")
        dev.setDescription(
            `Vous avez travaillé en tant que développeur et avez créé un site Web incroyable qui s'est vendu pour \`${hrandom} coins\` !`
          )
          dev.setColor(data.color)
          dev.setFooter(client.user.username)
          dev.setTimestamp()
          const crim = new Discord.MessageEmbed()
          crim.setTitle("🦹‍♂️・Criminelle")
          crim.setDescription(
              `Vous avez braquer une banque et vous avez voler\`${hrandom} coins\` !`
            )
            crim.setColor(data.color)
            crim.setFooter(client.user.username)
            crim.setTimestamp()
        const youtuber = new Discord.MessageEmbed()
        youtuber.setTitle("😀・YouTuber")
        youtuber.setDescription(
            `Le nombre de vues de votre vidéo était le plus élevé et vous avez reçu \`${hrandom} coins\` !`
          )
          youtuber.setColor(data.color)
          youtuber.setFooter(client.user.username)
          youtuber.setTimestamp()
  
        const bm = new Discord.MessageEmbed()
        bm.setTitle(" 👮・Officier de Police")
        bm.setDescription(
            `Vous avez reçu votre salaire de \`${hrandom} coins\` !`
          )
          bm.setColor(data.color)
          bm.setFooter(client.user.username)
          bm.setTimestamp()
  
        message.lineReply(embed).then(msg => {
          msg
            .react("👨‍💻")
            .then(() => msg.react("😀"))
            .then(() => msg.react("👮"))
            .then(() => msg.react("🦹‍♂️"))
          const filter = (reaction, user) => {
            return (
              ["👨‍💻", "😀", "👮","🦹‍♂️"].includes(reaction.emoji.name) &&
              user.id === message.author.id
            );
          };
  
          msg
            .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
            .then(collected => {
              const reaction = collected.first();
              if (reaction.emoji.name === "🦹‍♂️") {
                msg.edit(crim);
                msg.reactions.removeAll();
                db.add(`money_${message.guild.id}_${user.id}`, `${hrandom}`);
                db.set(`workpr_${message.guild.id}_${user.id}`, "Criminelle")
              }
              if (reaction.emoji.name === "👨‍💻") {
                msg.edit(dev);
                msg.reactions.removeAll();
                db.add(`money_${message.guild.id}_${user.id}`, `${hrandom}`);
                db.set(`workpr_${message.guild.id}_${user.id}`, "Développeur")
              } else if (reaction.emoji.name === "😀") {
                msg.edit(youtuber);
                msg.reactions.removeAll();
                db.add(`money_${message.guild.id}_${user.id}`, `${hrandom}`);
                db.set(`workpr_${message.guild.id}_${user.id}`, "YouTuber")
                
              } else if (reaction.emoji.name === "👮") {
                msg.edit(bm);
                db.add(`money_${message.guild.id}_${user.id}`, `${hrandom}`);
                db.set(`workpr_${message.guild.id}_${user.id}`, "Officier de Police")

                msg.reactions.removeAll();
              }
            })
            .catch(collected => {
              message.lineReply("tu n'as rien réagi. ouf idiot");
            });
        });
      }
    
    }
}
