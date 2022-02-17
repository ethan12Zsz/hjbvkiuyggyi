const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "reset",
    aliases: [],
    cooldown: 2000,
  ownerOnly: true,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args, data) {
        if (!args[0]) return message.lineReply(message.translate.error(this, "args"))
        if(args[0] === "all") {
            message.lineReply(`:recycle: Reset en cours...`).then(async m => {
                data.whitelist =  "whitelist".split('==%;')
            data.save()
db.delete(`logs_${message.guild.id}`)
let un = await db.all().filter(data => data.ID.startsWith(`bank_${message.guild.id}`));
let deux = 0;
for(let i = 0; i < un.length; i++) {
  db.delete(un[i].ID);
  deux++;
}
let trois = await db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`));
let quattre = 0;
for(let i = 0; i < trois.length; i++) {
  db.delete(trois[i].ID);
  quattre++;
}
let cinq = await db.all().filter(data => data.ID.startsWith(`antirob_${message.guild.id}`));
let six = 0;
for(let i = 0; i < cinq.length; i++) {
  db.delete(cinq[i].ID);
  six++;
}   
let sept = await db.all().filter(data => data.ID.startsWith(`pick_${message.guild.id}`));
let neuf = 0;
for(let i = 0; i < sept.length; i++) {
  db.delete(sept[i].ID);
  neuf++;
}   
let huit = await db.all().filter(data => data.ID.startsWith(`gun_${message.guild.id}`));
let dix = 0;
for(let i = 0; i < huit.length; i++) {
  db.delete(huit[i].ID);
  dix++;
}   
let tt = await db.all().filter(data => data.ID.startsWith(`fishingrob_${message.guild.id}`));
let ttt = 0;
for(let i = 0; i < tt.length; i++) {
  db.delete(tt[i].ID);
  ttt++;
}   
let rr = await db.all().filter(data => data.ID.startsWith(`bar_${message.guild.id}`));
let rrt = 0;
for(let i = 0; i < rr.length; i++) {
  db.delete(rr[i].ID);
  rrt++;
} 
let uu = await db.all().filter(data => data.ID.startsWith(`gara_${message.guild.id}`));
let uut = 0;
for(let i = 0; i < uu.length; i++) {
  db.delete(uu[i].ID);
  uut++;
} 
let ss = await db.all().filter(data => data.ID.startsWith(`maga_${message.guild.id}`));
let sst = 0;
for(let i = 0; i < ss.length; i++) {
  db.delete(ss[i].ID);
  sst++;
} 

let yy = await db.all().filter(data => data.ID.startsWith(`cine_${message.guild.id}`));
let yyt = 0;
for(let i = 0; i < yy.length; i++) {
  db.delete(yy[i].ID);
  yyt++;
} 
let tg = await db.all().filter(data => data.ID.startsWith(`gare_${message.guild.id}`));
let tgt = 0;
for(let i = 0; i < tg.length; i++) {
  db.delete(tg[i].ID);
  tgt++;
} 
let nn = await db.all().filter(data => data.ID.startsWith(`workpr_${message.guild.id}`));
let nnt = 0;
for(let i = 0; i < nn.length; i++) {
  db.delete(nn[i].ID);
  nnt++;
} 

let bb = await db.all().filter(data => data.ID.startsWith(`bannerpr_${message.guild.id}`));
let bbt = 0;
for(let i = 0; i < bb.length; i++) {
  db.delete(bb[i].ID);
  bbt++;
} 

db.delete(`cam_${message.guild.id}`)
db.delete(`temps_${message.guild.id}`)
db.delete(`msg_${message.guild.id}`)
db.delete(`voc_${message.guild.id}`)
db.delete(`stream_${message.guild.id}`)

const embed = new Discord.MessageEmbed()
    .setDescription(`:coin: L'économie actuelle a bien été reset\nLes configurations n'ont pas été modifiés durant le reset`)
    .setTimestamp()
    .setColor(data.color)
    .setFooter(client.user.username)
    m.edit("",embed)})
        
  
        } else if( message.mentions.users.first()) {
            message.lineReply(`:recycle: Reset en cours...`).then(async m => {
          await db.delete(`bank_${message.guild.id}_${message.mentions.users.first().id}`)
            await db.delete(`money_${message.guild.id}_${message.mentions.users.first().id}`)
            db.delete(`antirob_${message.guild.id}_${message.mentions.users.first().id}`)
            db.delete(`pick_${message.guild.id}_${message.mentions.users.first().id}`)
             db.delete(`gun_${message.guild.id}_${message.mentions.users.first().id}`)
         db.delete(`fishingrob_${message.guild.id}_${message.mentions.users.first().id}`)
           db.delete(`bar_${message.guild.id}_${message.mentions.users.first().id}`)
           db.delete(`gara_${message.guild.id}_${message.mentions.users.first().id}`)
          db.delete(`maga_${message.guild.id}_${message.mentions.users.first().id}`)
      db.delete(`cine_${message.guild.id}_${message.mentions.users.first().id}`)
           db.delete(`gare_${message.guild.id}_${message.mentions.users.first().id}`)
            db.delete(`workpr_${message.guild.id}_${message.mentions.users.first().id}`)
            db.delete(`bannerpr_${message.guild.id}_${message.mentions.users.first().id}`)
            const embed = new Discord.MessageEmbed()
             .setDescription(`:coin: L'économie actuelle de ${message.mentions.users.first()} a bien été reset\nLes configurations n'ont pas été modifiés durant le reset`)
             .setTimestamp()
             .setColor(data.color)
             .setFooter(client.user.username)
             m.edit("",embed)})
        }
    }
}
