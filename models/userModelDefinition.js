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
            allowNull:false,
            validate:{
                notEmpty:{
                    msg: "Le Prénom n'a pas été rentré."
                }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg: "Le nom n'a pas été rentré."
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                arg: true,
                msg:`Ce nom d'utilisateur a déjà été inscrit.`
            },
            allowNull:false,
            validate:{
                notNull: {
                    msg: `Il faut un nom d'utilisateur`
                },
                notEmpty:{
                    msg: "Le nom d'utilisateur est incorrect."
                },
            }            
        },
        password: {
            type: DataTypes.STRING,
        }
    });
}
