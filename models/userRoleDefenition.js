// Users Role Table definition
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Role', {
        id: { type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement:  true
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue: "User",
            notNull: true,
            validate:{
                notEmpty:{
                    msg: "Un rôle utilisateur ne peux pas être vide"
                }
            }
        }
    });
}