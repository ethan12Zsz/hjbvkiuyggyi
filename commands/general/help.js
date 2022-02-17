const Discord = require("discord.js")
const db = require("quick.db")
const moment = require('moment');

module.exports = {
    name: "help",
    aliases: ["h"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {
        if (args[0]) {
            let command = client.commands.get(args[0]) || client.commands.find(c => c.aliases && c.aliases.includes(args[0]))
            if (!command) return message.lineReply(message.translate.general.help.cannotFindCommand(args[0]))
            let r = "`"+command.aliases+"`"
            if(r == "``") r = ":x:"
            let e = "`"+moment.utc(command.cooldown).tz('Europe/Paris').format('s')+"s`"
            if(e == "`s`") e = ":x:"
            let embed = new Discord.MessageEmbed()
            embed.setTitle(message.translate.general.help.command.title(command.name))
            embed.setTimestamp()
            embed.setColor(data.color)
            embed.setFooter(client.user.username)
            embed.addField(message.translate.general.help.command.description, `${message.translate[command.class][command.name].description}`)
            embed.addField(message.translate.general.help.command.usage, `\`${data.prefix}${command.name} ${message.translate[command.class][command.name].usage}\``)
            embed.addField(message.translate.general.help.command.example, `\`${data.prefix}${command.name} ${message.translate[command.class][command.name].example}\``)
            embed.addField(message.translate.general.help.command.permission, `${command.userPermissions.length >= 1 ? `${command.userPermissions.map(p => "``" + message.translate.formatPermission(p) + "``").join(', ')}` : ":x:"}`)
            embed.addField(message.translate.general.help.command.cooldown, `${e}`, true)
            embed.addField(message.translate.general.help.command.aliases, `${r}` , true)

            return message.lineReply(embed)
        }

        let embed = new Discord.MessageEmbed()

        embed.setTitle(message.translate.general.help.title)
        embed.setDescription(message.translate.general.help.descriptionEE(data.prefix, message.guild))
        embed.setFooter(client.user.username)
        embed.setTimestamp()
        embed.setColor(data.color)
        embed.setThumbnail(client.user.displayAvatarURL({dynamic : true }))

        const categories = []
        client.commands.array().forEach(async (command, i) => {
            if (!categories.includes(command.class)) {
                categories.push(command.class);
            }
        })

        categories.sort().forEach((cat) => {
            const tCommands = client.commands.filter((cmd) => cmd.class === cat);
            embed.addField(`${message.translate.general.help.categories[cat.toLowerCase()]} (${tCommands.size})`, tCommands.map((cmd) => "`" + cmd.name + "`").join(", "));
        });
        let cam = db.get(`cam_${message.guild.id}`)
        if(cam === null ) cam = "500"
        let stream = db.get(`stream_${message.guild.id}`)
        if(stream === null ) stream = "500"
        let voc = db.get(`voc_${message.guild.id}`)
        if(voc === null ) voc = "10"
        let temps = db.get(`temps_${message.guild.id}`)
        if(temps === null ) temps = "15"
        let msg = db.get(`msg_${message.guild.id}`)
        if(msg === null ) msg = "1"
embed.addField(`\`\`\`                                                      \`\`\`` ,`> Vous gagnez actuellement \`${voc} coins\` toutes les \`${temps} minutes\` lorsque vous êtes en vocal, \`${msg} coins\` par message envoyer, \`${stream} coins\` lorsque vous lancez un stream et \`${cam} coins\` lorsque vous activez votre caméra !`)
        message.lineReply(embed)
    }
}
