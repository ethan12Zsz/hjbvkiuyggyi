const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}

module.exports = {
    name: "profil",
    aliases: ["profile"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
        if(args[0] === "settings"){
            let rep = await db.get(`rep_${message.guild.id}_${message.author.id}`)
            if(rep === null ) rep = 0
            dureefiltrer = response => { return response.author.id === message.author.id };

            const embed = new Discord.MessageEmbed()
            embed.setTitle("Paramétre du profile")
            embed.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
      💬・Ajouter une **bio** pour \`1 reputations\`
      🖼️・Ajouter une **banniére** pour \`2 reputations\`
      🎨・Changer la **couleur de l'embed** pour \`4 reputations\`

                       `)
          
                
           embed.setTimestamp()
           embed.setColor(data.color)
           embed.setFooter(client.user.username)
              
                  message.lineReply(embed).then( async (m) => {
      await m.react("💬")
      await sleep(250);
      await m.react("🖼️")
      await sleep(250);
      await m.react("🎨")
      await sleep(250);
      
                      let collector = m.createReactionCollector((reaction, user) => user.id === message.author.id);
                      collector.on("collect", async (reaction, user) => {
      if (reaction._emoji.name === "💬") {
        if(rep < 1) return await message.channel.send(":x: Vous n'avez assez de réputation pour une **bio** !").then((mm) => mm.delete({timeout: 2500}));
        message.channel.send(`Veuillez entrer votre nouvelle **bio**. (*Mettez \`delete\` pour l'enlever*)`).then(mp => {
          mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
          .then(cld => {
              if(cld.first().content === "delete") {
                  mp.delete()
                  cld.first().delete()
                  db.set(`bio_${message.guild.id}_${message.author.id}`, null)
  
                  
              }else {
          var msg = cld.first();
          db.set(`bio_${message.guild.id}_${message.author.id}`, msg.content)
           db.subtract(`rep_${message.guild.id}_${message.author.id}`, 1)
           mp.delete()
           cld.first().delete()
                        }})})
   
                       
                  
                      }
                      if (reaction._emoji.name === "🖼️") {
     
                        if(rep < 2) return await message.channel.send(":x: Vous n'avez assez de réputation pour une **image de profil** !").then((mm) => mm.delete({timeout: 2500}));
                        message.channel.send(`Veuillez entrer votre nouvelle **banniére**. (*Mettez \`delete\` pour l'enlever*)`).then(mp => {
                          mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                          .then(cld => {
                              if(cld.first().content === "delete") {
                                  mp.delete()
                                  cld.first().delete()
                                  db.set(`bannerpr_${message.guild.id}_${message.author.id}`, null)
                  
                                  
                              }else {
                          var msg = cld.first();
                          if( msg.content.endsWith("https") && msg.content.endsWith("http")) return message.lineReply("Merci d'entré une image valide !").then((mm) => mm.delete({timeout: 2500}));

                          db.set(`bannerpr_${message.guild.id}_${message.author.id}`, msg.content)
                          db.subtract(`rep_${message.guild.id}_${message.author.id}`, 2)
                          mp.delete()
                          cld.first().delete()                        }})})
                     
                  
                    }
                    if (reaction._emoji.name === "🎨") {
                        if(rep < 4) return await message.channel.send(":x: Vous n'avez assez de réputation pour une **couler d'embed personalisé** !").then((mm) => mm.delete({timeout: 2500}));
                        message.channel.send(`Veuillez entrer votre nouvelle **couleur d'embed personalisé**. (*Mettez \`delete\` pour l'enlever*)`).then(mp => {
                          mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
                          .then(cld => {
                              if(cld.first().content === "delete") {
                                  mp.delete()
                                  cld.first().delete()
                                  db.set(`couleurpr_${message.guild.id}_${message.author.id}`, null)
                  
                                  
                              }else {
                          var msg = cld.first();

                          db.set(`couleurpr_${message.guild.id}_${message.author.id}`, msg.content)
                          db.subtract(`rep_${message.guild.id}_${message.author.id}`, 4)
                          mp.delete()
                          cld.first().delete()                        }})})
                      

                  
                    }
      
                    
                    await reaction.users.remove(message.author.id);
                      
                     })})
        } else {
            let user = message.mentions.users.first() || message.author;
    let bio = db.get(`bio_${message.guild.id}_${user.id}`)
        if(bio === null) bio = "Non définit"
    
        let antirob = db.get(`antirob_${message.guild.id}_${user.id}`)
        if(antirob === null) antirob = "Non Actif"  
        if(antirob === true) antirob = "Actif"  
        let pick = db.get(`pick_${message.guild.id}_${user.id}`)
        if(pick === null) pick = "Non Possédé"  
        if(pick === true) pick = "Possédé" 
        let gun = db.get(`gun_${message.guild.id}_${user.id}`)
        if(gun === null) gun = "Non Possédé"  
        if(gun === true) gun = "Possédé" 
        let fishingrob = db.get(`fishingrob_${message.guild.id}_${user.id}`)
        if(fishingrob === null) fishingrob = "Non Possédé"  
        if(fishingrob === true) fishingrob = "Possédé" 
        let bar = db.get(`bar_${message.guild.id}_${user.id}`)
        if(bar === null) bar = "Non Possédé"  
        if(bar === true) bar = "Possédé"  
        let gara = db.get(`gara_${message.guild.id}_${user.id}`)
        if(gara === null) gara = "Non Possédé"  
        if(gara === true) gara = "Possédé"  
        let maga = db.get(`maga_${message.guild.id}_${user.id}`)
        if(maga === null) maga = "Non Possédé"  
        if(maga === true) maga = "Possédé"  
        let cine = db.get(`cine_${message.guild.id}_${user.id}`)
        if(cine === null) cine = "Non Possédé"  
        if(cine === true) cine = "Possédé"  
        let gare = db.get(`gare_${message.guild.id}_${user.id}`)
        if(gare === null) gare = "Non Possédé"  
        if(gare === true) gare = "Possédé"  
        let work = db.get(`workpr_${message.guild.id}_${user.id}`)
        if(work === null) work = "Chômeur"  
        let embedbank = new Discord.MessageEmbed()
        embedbank .setTimestamp()
        embedbank .setColor(db.get(`couleurpr_${message.guild.id}_${user.id}`) === null? data.color:db.get(`couleurpr_${message.guild.id}_${user.id}`))
        embedbank.setFooter(client.user.username)
        embedbank.setTitle("Profil de "+user.tag)
        embedbank.addField(`👤・Bio`,bio)
        embedbank.addField(`:busts_in_silhouette:・métier `,work, true)
        embedbank.addField(`🎨・Couleur d'embed`,db.get(`couleurpr_${message.guild.id}_${user.id}`) === null? "Classique":db.get(`couleurpr_${message.guild.id}_${user.id}`), true)
        embedbank.addField(`💰・Anti-rob`,antirob, true)
        embedbank.addField(`⛏️・Pioche`, pick, true)
        embedbank.addField(`🎣・Canne à pêche`,fishingrob, true)
        embedbank.addField(`🔫・Pistolet`,gun, true)
        embedbank.setDescription(`🍾・**Bar**: ${bar}\n🚘・**Garage**: ${gara}\n🏪・**Magasin**: ${maga}\n📽️・**Cinéma**: ${cine}\n🚆・**Gare**: ${gare}`)


    embedbank.setImage(db.get(`bannerpr_${message.guild.id}_${user.id}`) ||"https://iroo.com")

        message.lineReply(embedbank)}      
          
    }
}
