const db = require('quick.db');
const Discord = require('discord.js');

module.exports = class {
    constructor(client) {
        this.client = client;
     
    }

    async run() {
        let startAt = Date.now()
        let client = this.client;


       console.log("conecter")
       client.guilds.cache.forEach(guild => {
        client.users.cache.forEach(user => {
            let barcoins = db.get(`barcoins_${guild.id}`)
            if(barcoins === null) barcoins = "100"
            let bartemps = db.get(`bartemps_${guild.id}`)
            if(bartemps === null) bartemps = "120"
            let garacoins = db.get(`garacoins_${guild.id}`)
            if(garacoins === null) garacoins = "200"
            let garatemps = db.get(`garatemps_${guild.id}`)
            if(garatemps === null) garatemps = "120"
            let magacoins = db.get(`magacoins_${guild.id}`)
            if(magacoins === null) magacoins = "300"
            let magatemps = db.get(`magatemps_${guild.id}`)
            if(magatemps === null) magatemps = "120"
            let cinecoins = db.get(`cinecoins_${guild.id}`)
            if(cinecoins === null) cinecoins = "400"
            let cinetemps = db.get(`cinetemps_${guild.id}`)
            if(cinetemps === null) cinetemps = "120"
            let garecoins = db.get(`garecoins_${guild.id}`)
            if(garecoins === null) garecoins = "500"
            let garetemps = db.get(`garetemps_${guild.id}`)
            if(garetemps === null) garetemps = "120"
            let ee = db.get(`moneyBAT_${guild.id}_${user.id}`)
            if(ee > 5000) return
         let logs = guild.channels.cache.get(db.fetch(`logs_${guild.id}`))

        let bar = db.get(`bar_${guild.id}_${user.id}`)
        if(bar === null) return
        if(bar === true) {  setInterval(() => {
                    db.add(`moneyBAT_${guild.id}_${user.id}`,barcoins)

                }, bartemps*60000  )
                if(logs) logs.send(new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
                .setDescription(`:coin: ${user} viens de recevoir sont salaire de \`${barcoins} coins\` (**bar**)\nProchain salaire dans \`${bartemps} minutes\``)
                .setTimestamp()
                .setColor("2f3136")
                .setFooter(client.user.username))
            }
        let gara = db.get(`gara_${guild.id}_${user.id}`)
        if(gara === null) return 
        if(gara === true)  { setInterval(() => {
                    db.add(`moneyBAT_${guild.id}_${user.id}`,garacoins)
                }, garatemps*60000  )
            
                if(logs) logs.send(new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
                .setDescription(`:coin: ${user} viens de recevoir sont salaire de \`${garacoins} coins\` (**garage**)\nProchain salaire dans \`${garatemps} minutes\``)
                .setTimestamp()
                .setColor("2f3136")
                .setFooter(client.user.username))
            }
        let maga = db.get(`maga_${guild.id}_${user.id}`)
        if(maga === null) return 
        if(maga === true)  { setInterval(() => {
                    db.add(`moneyBAT_${guild.id}_${user.id}`,magacoins)
                }, magatemps*60000  )
                if(logs) logs.send(new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
                .setDescription(`:coin: ${user} viens de recevoir sont salaire de \`${magacoins} coins\` (**magasin**)\nProchain salaire dans \`${magatemps} minutes\``)
                .setTimestamp()
                .setColor("2f3136")
                .setFooter(client.user.username))
            }
        let cine = db.get(`cine_${guild.id}_${user.id}`)
        if(cine === null) return 
        if(cine === true) {  setInterval(() => {
                    db.add(`moneyBAT_${guild.id}_${user.id}`,cinecoins)
                }, cinetemps*60000  )
                if(logs) logs.send(new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
                .setDescription(`:coin: ${user} viens de recevoir sont salaire de \`${cinecoins} coins\` (**cinéma**)\nProchain salaire dans \`${cinetemps} minutes\``)
                .setTimestamp()
                .setColor("2f3136")
                .setFooter(client.user.username))
            }
        let gare = db.get(`gare_${guild.id}_${user.id}`)
        if(gare === null) return 
        if(gare === true) {setInterval(() => {
                    db.add(`moneyBAT_${guild.id}_${user.id}`,garecoins)
                }, garetemps*60000  )
                   if(logs) logs.send(new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
                .setDescription(`:coin: ${user} viens de recevoir sont salaire de \`${garecoins} coins\` (**gare**)\nProchain salaire dans \`${garetemps} minutes\``)
                .setTimestamp()
                .setColor("2f3136")
                .setFooter(client.user.username))
            
            }
    
    })
       })
     
 

   
    }
}