const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "setlogs",
    aliases: [],
    cooldown: 2000,
    whitelistOnly: true,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args, data) {
        if (!args[0]) return message.lineReply(message.translate.error(this, "args"))

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!channel) {
            return message.lineReply(message.translate.error(this, "args"))
        }
      db.set(`logs_${message.guild.id}`, channel.id)
      let embed = new Discord.MessageEmbed()
      .setDescription(message.translate.admin.setlogs.success(channel))
      .setColor(data.color)
      .setTimestamp()
      .setFooter(client.user.username )
            message.lineReply(embed)
           
     
    }
}
