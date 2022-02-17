const Discord = require("discord.js");

module.exports = {
    name: "setcolor",
    aliases: [],
    cooldown: 2000,
    whitelistOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: [],
    async execute(client, message, args, data) {
        if (!args[0]) return message.lineReply(message.translate.error(this, "args"))

        data.color = args[0]
        data.save().then(async () => {
            message.lineReply(message.translate.admin.setcolor.success(args[0]))
        })
    }
}
