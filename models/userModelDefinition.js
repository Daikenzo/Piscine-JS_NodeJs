const { DATE } = require("sequelize");

// Coworking Table define - Users
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement:  true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le nom ne peut pas être vide'
                }
            },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le nom ne peut pas être vide'
                }
            },
        },
        username: {
            type: DataTypes.STRING,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date(Date.UTC(1990,0,1)),
        },
        password: {
            type: DataTypes.STRING,
        },
        role:{
            type: DataTypes.STRING,
            defaultValue: "user",
            allowNull:false,
        },
    });
}
