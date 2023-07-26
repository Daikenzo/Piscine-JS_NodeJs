// Coworking Table define - Coworking
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Coworking',{
    id: {
        type:DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement:  true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Le nom ne peut pas être vide'
            }
        },
        unique: {
            // Error.name => SequelizeUniqueConstraintError
            msg: 'Le nom est déjà pris'
        }
    },
    price: {
        type: DataTypes.JSON,
        validate:{
            isPriceValid(value){
                // let allNull = true
                // for (const key in value){
                //     if (value[key] !== null){
                //         allNull = false;
                //     }
                // }
                // if (value.hour === null && value.day === null && value.month === null){
                //     throw new Error('Le coworking doit spécifié au moins un prix.')
                // }
                if(value.hasOwnProperty('hour') && value.hasOwnProperty('day') && value.hasOwnProperty('month'))
                {
                    if (value.hour === null && value.day === null && value.month === null) {
                        throw new Error('Le coworking spécifié doit avoir au moins un prix.')
                    } 
                    
                } else{
                    throw new Error('La syntaxe des données est inccorect')
                }
            }
            
        }
    },
    picture:{
        type:DataTypes.STRING,
    },
    address:{
        type: DataTypes.JSON,
    },
    superficy: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                msg: 'La superficie doit être un nombre entier'
            },
            isNumeric: {
                msg: 'La superficie doit être un nombre'
            }
        }
    },
    capacity: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                msg: 'La capacité doit être un nombre entier'
            },
            isNumeric: {
                msg: 'La capacité doit être un nombre'
            }
        }
    },
});
}
