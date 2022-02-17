const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tdelete",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let user = message.author

    
        let dd = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(dd === null) {

            return message.lineReply(`:x: Vous n'avez pas de team !`)
        


} else {

    message.guild.members.cache.forEach( async m => {
        if(db.get(`teammember_${message.guild.id}_${m.id}_${dd}`)) return db.delete(`teammember_${message.guild.id}_${m.id}_${dd}`)

  });   

      db.delete(`teamdes_${message.guild.id}_${dd}`)
     db.delete(`teamcoins_${message.guild.id}_${dd}`)
db.delete(`teamsnumber_${message.guild.id}_${dd}`)
     db.delete(`teams_${message.guild.id}_${message.author.id}`)
     db.subtract(`teamliste_${message.guild.id}`, 1)
     db.set(`teamlist_${message.guild.id}`, db.get(`teamlist_${message.guild.id}`).filter(s => s.nom !== dd));
     db.subtract(`teamsnumber_${message.guild.id}_${dd}`, db.get(`teamsnumber_${message.guild.id}_${dd}`))
    let un = await db.all().filter(data => data.ID.startsWith(`teammember_${message.guild.id}_${dd}`));
let deux = 0;
for(let i = 0; i < un.length; i++) {
  db.delete(un[i].ID);
  deux++;
}
    return message.lineReply(`✅ Vous avez supprimé votre team **${dd}** !!`)


}
 

}}