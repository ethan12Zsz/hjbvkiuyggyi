const Wassim = require('./base/Wassim.js')
require('discord-reply'); 
const Discord = require("discord.js")
const { Events } = require("discord-addons");

const db = require("quick.db")
const client = new Wassim()
client.init("commands", "events", "models")
client.login(client.config.token)

new Events(client);
module.exports = client
const logs = require('discord-logs')
logs(client)
client.on("message", (message) => {
    if (message.author.bot) return;
    let msg = db.get(`msg_${message.guild.id}`)
    if(msg === null || undefined || false || [] ) msg = "1"
    db.add(`money_${message.guild.id}_${message.author.id}`, msg)

   

    
})

client.on("voiceChannelCameraStart", (member, voiceChannel) => {

    if(member.user.bot) return;
    
       let cam = db.get(`cam_${member.guild.id}`)
       if(cam === null ) cam = "500"
       db.add(`money_${member.guild.id}_${member.user.id}`, cam)
       let logs = member.guild.channels.cache.get(db.fetch(`logs_${member.guild.id}`))
       if(logs) logs.send(new Discord.MessageEmbed()
       .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic:true}))
       .setDescription(`:coin: ${member} viens de recevoir \`${cam} coins\`,\npour avoir activer sa caméra dans ${voiceChannel}.`)
       .setTimestamp()
       .setColor("2f3136")
       .setFooter(client.user.username))

    
})
//ODcyODg0NjQ4MTM1NDk1NzMy.YQwXLQ.pBbsUc2gGRVksaWi9WzwGY82m_k
client.on("voiceStateUpdate", async (oldState, newState) => {
    if (!oldState.channel && newState.channel) {
        if(oldState.member.bot) return;
    let voc = db.get(`voc_${oldState.guild.id}`)
    if(voc === null ) voc = "10"
    let temps = db.get(`temps_${oldState.guild.id}`)
    if(temps === null ) temps = "15"
    
    setTimeout(async() => {      
        db.add(`money_${oldState.guild.id}_${oldState.member.id}`, voc)
        let logs = oldState.guild.channels.cache.get(db.fetch(`logs_${oldState.guild.id}`))
        if(logs)   logs.send(new Discord.MessageEmbed()
       // .setAuthor(oldState.member.tag, oldState.user.displayAvatarURL({dynamic:true}))
        .setDescription(`:coin: <@${oldState.member.id}> viens de recevoir \`${voc} coins\`,\n pour avoir rester en vocal pendant \`${temps} minutes.\``)
        .setTimestamp()
        .setColor("2f3136")
        .setFooter(client.user.username))
    }, temps*60000)
    }
})

client.on("voiceChannelStreamStart", (member, voiceChannel) => {
    if(member.user.bot) return;
    
    
    let stream = db.get(`stream_${member.guild.id}`)
    if(stream === null ) stream = "500"
    db.add(`money_${member.guild.id}_${member.user.id}`, stream)
    let logs = member.guild.channels.cache.get(db.fetch(`logs_${member.guild.id}`))
    if(logs) logs.send(new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic:true}))
    .setDescription(`:coin: ${member} viens de recevoir \`${stream} coins\`,\n pour avoir lancer un stream dans ${voiceChannel}.`)
    .setTimestamp()
    .setColor("2f3136")
    .setFooter(client.user.username))


    
})


