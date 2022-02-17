const Discord = require("discord.js")

module.exports = {
    name: "ping",
    aliases: [],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {

        let msg = await message.lineReply(message.translate.general.ping.loading)
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.translate.general.ping.title, "https://media.discordapp.net/attachments/851876715835293736/852647593020620877/746614051601252373.png")

        embed.addField(message.translate.general.ping.websocket, `${client.ws.ping}ms`)
        embed.addField(message.translate.general.ping.api, `${msg.createdAt - message.createdAt + "ms"}`)
        embed.setTimestamp()
        embed.setColor(data.color)
        embed.setFooter(client.user.username)

        return msg.edit("", embed)
    }
}