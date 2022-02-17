const chalk = require('chalk');

module.exports = async (Sequelize, volt) => {
    try {
        volt.database.define('guilds', {

            // CONFIGURATION
            guildID: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            prefix: {
                type: Sequelize.STRING(1),
                defaultValue: volt.config.prefix,
                allowNull: false
            },
            language: {
                type: Sequelize.STRING(2),
                defaultValue: "fr"
            },
           
            commandsMade: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
        
           
            whitelist: {
                type: Sequelize.TEXT,
                defaultValue: " ",
                get() {
                    return this.getDataValue('whitelist').split('==%;')
                },
                set(val) {
                    this.setDataValue('whitelist', val.join('==%;'));
                },
            },
           
            color: {
                type: Sequelize.TEXT,
                defaultValue: `2f3136`,
            },
          
        }, {
            timestamps: true
        });
        return volt.database.models;
    } catch (error) {
        console.log(error)
    }
}