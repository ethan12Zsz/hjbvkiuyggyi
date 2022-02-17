const chalk = require('chalk');

module.exports = async (Sequelize, volt) => {
    try {
        volt.database.define('members', {

            // CONFIGURATION
            userID: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            guildID: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
        
         
        }, {
            timestamps: true
        });
        return volt.database.models;
    } catch (error) {
        console.log(error)
    }
}