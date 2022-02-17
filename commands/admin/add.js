const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "add",
    aliases: [],
    cooldown: 2000,
    whitelistOnly: true,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args, data) {
        if (!args[0]) return message.lineReply(message.translate.error(this, "args"))
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.lineReply(`:x: Merci d'entrer un membre valide !`)

        let amount = args[1];
        if (!amount || isNaN(amount)) return message.lineReply(message.translate.error(this, "args"))
    db.add(`money_${message.guild.id}_${user.id}`, amount)
        return message.lineReply(`:coin: Vous venez de d'ajouter à **${user.tag}** un montant de \`${amount} coins\``);
    }
}
