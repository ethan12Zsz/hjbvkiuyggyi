const Discord = require("discord.js");

module.exports = {
    name: "setprefix",
    aliases: [],
    cooldown: 2000,
    whitelistOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: [],
    async execute(client, message, args, data) {
        if (!args[0]) return message.lineReply(message.translate.error(this, "args"))

        var regex = /^[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1}$/igm;
        var isValid = regex.test(args[0]);

        if (!isValid) return message.lineReply(message.translate.admin.setprefix.invalid("``!‎``, ``@``, ``#‎``, ``$‎``, ``%‎``, ``^‎``, ``&‎``, ``*‎``, ``(‎``, ``)‎``, ``_‎``, ``+‎``, ``\\‎``, ``-‎``, ``=‎``, ``{‎``, ``}‎``, ``;‎``, ``'‎``, ``:‎``, ``\"‎``, ``|‎``, ``,‎``, ``.‎``, ``<‎``, ``>‎``, ``\/‎``, ``?``"))

        data.prefix = args[0]
        data.save().then(async () => {
            message.lineReply(message.translate.admin.setprefix.success(args[0]))
        })
    }
}
