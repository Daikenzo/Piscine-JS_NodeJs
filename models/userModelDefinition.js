const { DATE } = require("sequelize");

// Coworking Table define - Users
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement:  true
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            
        },
        password: {
            type: DataTypes.STRING,
        }
    });
}
