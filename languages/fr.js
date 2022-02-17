const { MessageEmbed, DiscordAPIError } = require('discord.js')
const client = require('../index')
const moment = require('moment')
const ms = require('ms')
const date = require('date-and-time');


function duration(mss) {
    const sec = Math.floor((mss / 1000) % 60).toString()
    const min = Math.floor((mss / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
    return `${hrs.padStart(2, '') == "0" ? "" : `**${hrs.padStart(2, '')}** heures, `}${min.padStart(2, '') == "0" ? "" : `**${min.padStart(2, '')}** minutes et `}**${sec.padStart(2, '')}** secondes.`
}

function numAverage(a) {
    var b = a.length,
        c = 0, i;
    for (i = 0; i < b; i++) {
        c += Number(a[i]);
    }
    return c / b;
}

let status = {
    'online': '<:IconStatusOnline:914499557692436510>',
    'idle': '<:IconStatusIdle:914499615284404275>',
    'offline': '<:IconStatusOffline:914499640966123542>',
    'dnd': '<:IconStatusDND:914499584661815337>',
}

let activity = {
    'PLAYING': 'Joue à',
    'STREAMING': 'Streame',
    'LISTENING': 'Écoute',
    'WATCHING': 'Regarde',
}

module.exports = {
    local: "fr_FR",
    formatPermission: (p) => {
        return p.replace("CREATE_INSTANT_INVITE", `Créer un invitations`)
            .replace("ADMINISTRATOR", `Administrateur`)
            .replace("KICK_MEMBERS", `Expulser des membres`)
            .replace("BAN_MEMBERS", `Bannir des membres`)
            .replace("MANAGE_CHANNELS", `Gérer les salons`)
            .replace("MANAGE_GUILD", `Gérer le serveur`)
            .replace("ADD_REACTIONS", `Ajouter des réactions`)
            .replace("VIEW_AUDIT_LOG", `Voir les logs du serveur`)
            .replace("PRIORITY_SPEAKER", `Voix prioritaire`)
            .replace("STREAM", `Lancer un stream`)
            .replace("VIEW_CHANNEL", `Lire les salons textuels & voir les salons vocaux`)
            .replace("SEND_MESSAGES", `Envoyer des messages`)
            .replace("SEND_TTS_MESSAGES", `Envoyer des messages TTS`)
            .replace("MANAGE_MESSAGES", `Gérer les messages`)
            .replace("EMBED_LINKS", `Intégrer des liens`)
            .replace("ATTACH_FILES", `Joindre des fichiers`)
            .replace("READ_MESSAGE_HISTORY", `Voir les anciens messages`)
            .replace("MENTION_EVERYONE", `Mentionner @everyone, @here et tous les rôles`)
            .replace("USE_EXTERNAL_EMOJIS", `$Utiliser des émojis externe`)
            .replace("VIEW_GUILD_INSIGHTS", `Voir les analyses du serveur`)
            .replace("CONNECT", `Se connecter`)
            .replace("SPEAK", `Parler`)
            .replace("MUTE_MEMBERS", `Couper les micros de membres`)
            .replace("DEAFEN_MEMBERS", `Mettre en sourdine des membres`)
            .replace("MOVE_MEMBERS", `Déplacer des membres`)
            .replace("USE_VAD", `Utiliser la détection de la voix`)
            .replace("CHANGE_NICKNAME", `Changer le pseudo`)
            .replace("MANAGE_NICKNAMES", `Gérer les pseudos`)
            .replace("MANAGE_ROLES", `Gérer les rôles`)
            .replace("MANAGE_WEBHOOKS", `Gérer les webhooks`)
            .replace("MANAGE_EMOJIS", `Gérer les émojis`)
    },
    error: (cmd, error, options) => {
        if (error == "args") {
            return `:x: **Usage incorrect !**\nDescription: ${client.translator("fr")[client.commands.get(cmd.name).class][cmd.name].description}\nUsage: \`${options ? options.prefix : client.config.prefix}${cmd.name} ${client.translator("fr")[client.commands.get(cmd.name).class][cmd.name].usage}\`\nExemple: \`${options ? options.prefix : client.config.prefix}${cmd.name} ${client.translator("fr")[client.commands.get(cmd.name).class][cmd.name].example}\``
        }
        if (error == "userPermissions") {
            return `:x: Vous n'avez pas les permissions suffisantes pour faire cette commande. (${options.permissions.map(p => `\`${p}\``).join("")})`
        }
        if (error == "botPermissions") {
            return `:x: Je n'ai pas les permissions suffisantes pour faire cette commande. (${options.permissions.map(p => `\`${p}\``).join("")})`
        }
        if (error == "ownerOnly") {
            return `:x: Seulement ${options.owners.length > 1 ? options.owners.map(o => client.users.cache.get(o).tag).slice(0, -1).join(', ') + ' et ' + options.owners.map(o => client.users.cache.get(o).tag).slice(-1) : client.users.cache.get(options.owners[0]).tag} ${options.owners.length > 1 ? 'peuvent' : 'peut'} faire cette commande !`
        }
       
        if (error == "cooldown") {
            return `:x: Vous devez attendre ${Math.ceil(options.cooldown)} seconde${options.cooldown > 1 ? 's' : ''} avant de refaire cette commande.`
        }
   
        if (error == "x") {
            return `:x: `
        }
        if (error == "y") {
            return `✅ `
        }
    },
 
    
    utils: (type, options) => {
        if (type == "tag") {
            return `Mon préfix est \`${options.prefix}\` `
        }
    },
    owner: {
        setprofile: {
            example: '',
            description: "Permet de changer les paramètres du bot",
            title: '<:IconRightCaret:914205842411233332> **__Paramètres du profile__**',
            
            get descriptione() {
                return `1️⃣・Changer le nom d'utilisateur\nActuel: ${client.user.username}\n\n2️⃣・Changer l'avatar\nActuel: [Clique ici](${client.user.displayAvatarURL()})\n\n3️⃣・Changer l'activitée\nActuel: ${client.user.presence.activities[0] ? `${activity[client.user.presence.activities[0].type]} ${client.user.presence.activities[0].name}` : `:x:`}\n\n4️⃣・Changer la presence du bot\nActuel: ${client.user.presence.status ? client.user.presence.status : ":x:"}`
            },
            loading: 'Chargement...',
            question: [{
                question: "1️⃣・Quel nom voulez-vous attribuez au bot ?",
                error: ":x: Je n'ai pas pu changer mon pseudo :/"
            }, {
                question: "2️⃣・Quel avatar voulez-vous attribuez au bot ?",
                error: ":x: Je n'ai pas pu changer mon avatar car le lien est invalide :/"
            }, {
                question: "3️⃣・Quel type d'activité voulez-vous attribuez au bot (\`play\`, \`stream\`, \`watch\`, \`listen\`)",
                error: ":x: Type d'activité invalide"
            }, {
                question: "3️⃣・Quel nom voulez-vous attribuez à l'activité du bot ?"
            }]
        },
        reload: {
            usage: "<commande>",
            example: 'help',
            description: "Permet de recharger une commande",
            success: (cmd) => `✅ La commande \`${cmd}\` a été reload !`,
            cantFind: (cmd) => `:x: Je ne trouve aucune commande nommée \`${cmd}\``
        }
    },
    admin: {
        whitelist: {
            usage: "<add/remove/list/clear> <mention/id/tag>",
            example: 'add Wassim.#0002',
            description: "Permet de d'ajouter un utilisateur à la whitelist",
            add: (user) => `${user.user.username} est maintenant whitelist`,
            remove: (user) => `${user.user.username} n'est maintenant plus whitelist`,
            list: {
                loading: `Chargement...`,
                title: (length) => `<:IconRightCaret:914205842411233332> **__Liste blanche (${length})__**`
            }
        },
        setprefix: {
            usage: "<préfix>",
            example: '!',
            description: "Permet de définir un nouveau préfix.",
            invalid: (list) => `:x: Veuillez utiliser les prefixes suivants: ${list}`,
            success: (prefix) => `Mon prefix est maintenant : \`${prefix}\``
        },
        add: {
            usage: "<@membre> <montant>",
            example: '@Wassim 33',
            description: "Permet d'ajouter des coins à un membre.",
        },
        enchere: {
            usage: "<#channel> <durée (m, h, d)> <montant> <gain>",
            example: '885186599556612147 1h 33 Nitro',
            description: "Permet de lancer un enchère.",
        },
        remove: {
            usage: "<montant> <@membre>",
            example: '@Wassim 33',
            description: "Permet de retirer des coins à un membre.",
        },    
        
        setcolor: {
           
            usage: "<couleur hexadécimale>",
            example: '#FFFFF',
            description: "Permet de définir une nouvelle couleur aux embeds.",
            success: (prefix) => `✅ Vous avez modifié la couleur d'embed en \`${prefix}\``
        },
        setgain: {
            usage: "",
            example: '',
            description: "Permet de définir les récompensse en vocal/message/batiment.",
        },
        reset: {
            usage: "<all/@membre>",
            example: 'all',
            description: "Permet de définir les récompensse en vocal.",
        },
        items: {
            usage: "",
            example: '',
            description: "Permet de crée des items perso pour le cshop.",
        },
        setlogs: {
            usage: "<mention/id/nom>",
            example: '#salon-de-log',
            description: "Permet de définir un nouveau salon de log d'activité vocal.",
            success: (channel) => `:telephone_receiver: Le salon ${channel} est maintenant définit comme salon de **logs d'activité vocale** ! `
        },
     
     
    },
    job: {
        batiment: {
            example: "",
            usage: "",
            description: "Permet de gerer vos batiments.",
        
        },
        objet: {
            example: "",
            usage: "",
            description: "Permet de gerer vos objet.",
        },
        fish: {
            example: "",
            usage: "",
            description: "Pêche et gagne des coins.",
        
        },
        mine: {
            example: "",
            usage: "",
            description: "Mine et gagne des coins.",
        
        },
        hunt: {
            example: "",
            usage: "",
            description: "Chasse un animal et gagne des coins.",
        
        },
        job: {
            example: "",
            usage: "",
            description: "Permet de travailer.",
        
        },
    },
    team: {
        tcreate: {
            example: "",
            usage: "",
            description: "Permet de crée un team vous avez besoin de 2000 coins.",
        
        },
        tedit: {
            example: "",
            usage: "",
            description: "Permet de modifier votre team.",
        
        },
        tinfo: {
            example: "WassimGang",
            usage: "<Team>",
            description: "Permet voir les informations par apport à votre team.",
        
        },
        tinvite: {
            example: "@wassim",
            usage: "<@membre>",
            description: "Permet d'inviter un membre dans votre team.",
        
        },
        tkick: {
            example: "@wassim",
            usage: "<@membre>",
            description: "Permet de kick un membre dans votre team.",
        
        },
        tkick: {
            example: "@wassim",
            usage: "<@membre>",
            description: "Permet de kick un membre dans votre team.",
        
        },
        tadd: {
            usage: "<montant>",
            example: "33",
            description: "Permet de donner des coins a votre team.",
        
        },
        tleave: {
            usage: "<team nom>",
            example: "",
            description: "Permet de leave une team.",
        
        },
    },
   coins: {
    coins: {
        example: "",
        usage: "[@user]",
        description: "Permet de voir vos coins ou ceux d'autre membre.",
    
    },
    rep: {
        example: "@wassim",
        usage: "<membre>",
        description: "Permet de donner un point de réputation à un membre.",
    
    },
    setbio: {
        example: "Je suis bg",
        usage: "<bio>",
        description: "Permet de mettre une bio sur son profil.",
    
    },
    setbanner: {
        example: "https://discord.com/....gif",
        usage: "<url>",
        description: "Permet de mettre une image sur son profil.",
    
    },
    profil: {
        example: "",
        usage: "[@user] || [settings]",
        description: "Permet de voir le profil de quelqu'un.",
    
    },
    top: {
        example: "",
        usage: "",
        description: "Permet de voir les 10 membres avec le plus de coins sur le serveur.",
    
    },
    boutique: {
        example: "",
        usage: "",
        description: "Permet de voir la boutique est d'acheter dedans.",
    
    },
    pay: {
        example: "@wassim 33",
        usage: "<@membre> <montant>",
        description: "Permet de donner vos coins à d'autre membre.",
    
    },
    deposit: {
        example: "33",
        usage: "<montant> || [all]",
        description: "Permet de deposer de l'argent à la banque.",
    
    },
    with: {
        example: "",
        usage: "<montant> || [all]" ,
        description: "Permet de retirer de l'argent à la banque.",
    
    },
    shop: {
        example: "",
        usage: "",
        description: "Permet d'acheter des items.",
    
    },    
    cshop: {
        example: "",
        usage: "",
        description: "Permet d'acheter des items personalisé.",
    
    }, 
   } ,
   casino: {
    beg: {
        example: "",
        usage: "",
        description: "Permet de mendié.",
    
    },

    gamble: {
        example: "",
        usage: "<montant>",
        description: "Pariez dans un jeu de dés basique contre le bot",
    
    },
    roll: {
        example: "",
        usage: "<nombre (un/deux/.../six)> <montant>",
        description: "Pariez de l'argent sur la prédiction du résultat d'un lancer de dés. Si vous gagnez, vous en obtenez plus. Mais si vous perdez, vous perdez le montant que vous avez misé.",
    
    },
   
    coinflip: {
        example: "pile 33",
        usage: "<pile/face> <montant>",
        description: "Jouer au coinflip et miser une partie de votre argent",
    
    },

  
    slots: {
        example: "33",
        usage: "<montant>",
        description: "Permet de jouer à la machine à sous.",
    
    },

    blackjack: {
        example: "33",
        usage: "<montant>",
        description: "Permet de jouer au blackjack.",
    
    },
    rob: {
        example: "@wassim",
        usage: "<membre>",
        description: "Permet de voler un membre (atttention vous pouvez vous faire prendre).",
    
    },
    roulette: {
        example: "Rouge 33",
        usage: "<couleur ( rouge, vert, noir)> <montant>",
        description: "Permet de parier.",
    
    },

    daily: {
        example: "",
        usage: "",
        description: "Permet de recevoir vos daily reward.",
    
    },
   },
    general: {
        help: {
            example: "",
            usage: "[command]",
            description: "Permet de recevoir de l'aide par apport aux command du bot.",
           // title: `Page d'aide des commandes`,
           title: `**Page d'aide**`,
            categories: {
            //     'admin': `<:admin:847072572427862037>・Administration`,
            //     'general': '<:global:847072628506361906>・Général',

            //     'coins': `<a:coins:851831238817349722>・Gestion des coins`,
            //     'casino': `<:games_mys:847072588736102410>・Jeux`,
            //     'job': `<:ltMembers:847072563539738675>・Job`,
            //     'team': `<:DiamondSword:894688552783347722>・Team`,
            //    'zowner': '<:sz:847072576429228072>・Créateur',
                'coins': `<:IconMoney:913784744590852137>・Gestion des coins`,
                'admin': `<a:IconSettings:914205968944996413> ・Admin`,
                'casino': `<a:IconGame:913784724491759616>・Jeux`,
                'job': `<:IconUser:914504273176449058>・Job`,
                'team': `<:IconMembers:914503387557560321>・Team`,
                'general': '<:IconHelpCircle:914504626768846898>・Information',
                'zowner': '<a:IconOAuth2:914205479536820256>・Propriétaires',
              
            },
            cannotFindCommand: (s) => `:x: Je ne trouve aucune commande possédant comme nom \`${s}\``,
            command: {
               // title: (c) => `Page d'aide de la command ${c}`,
               title: (c) => `<a:IconOAuth2:914205479536820256> **__Informations de la commande ${c}__**`, 
               description: `Description`,
                usage: `Utilisation`,
                aliases: `Aliases`,
                cooldown: `Cooldown`,
                                example: `Exemple`,
                permission: `Permissions requises`,
            },
            descriptionEE: (prefix, guild) => `Préfix du robot sur ${guild.name}: \`${prefix}\`\nNombre de commande: **${client.commands.size}**`
        },
        ping: {
            example: "",
            usage: "",
            description: "Permet de connaître le temps de réponse du bot et de l'API OAuth2",
            title: `Temps de réponse`,
            websocket: `Temps de réponse du WebSocket`,
            loading: `Chargement...`,
            bot: `Temps de réponse du Bot`,
            api: `Temps de réponse de l'API`
        }
    },
 
    
}
