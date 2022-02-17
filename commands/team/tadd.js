const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: "tadd",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["SEND_MESSAGES" , "VIEW_CHANNEL"],   
    async execute(client, message, args, data) {
        let user = message.author

        let montant = args[0]

        if(isNaN(montant)) return message.lineReply(`Merci d'entrer un montant valide !`)

        let dd = db.get(`teams_${message.guild.id}_${message.author.id}`)
        if(dd === null ) {

            return message.lineReply(`:x: Vous devez être capitaine d'une team pour ajouter des coins à la team (*ps: Si vous n'êtes pas capitaine envoyer vos coins à votre capitaine avec la commande \`pay\` pour qu'il les transfért dans la team*) !`)
        


} else {

    let coin = db.fetch(`money_${message.guild.id}_${user.id}`)
if(coin < montant){

    return message.lineReply(`:x: Vous demandez plus que vous n'avez !`)

} else {
    db.subtract(`money_${message.guild.id}_${user.id}`, montant)
    db.add(`teamcoins_${message.guild.id}_${dd}`, montant)
    return message.lineReply(`✅ Vous avez ajouté **${montant}** à la team **${dd}** !!`)

}
}
 

}}