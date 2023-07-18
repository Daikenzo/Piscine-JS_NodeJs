// Coworking Table define - Coworking
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Coworking',{
    id: {
        type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true
    },    
    name:DataTypes.STRING,
    price: DataTypes.JSON,
    address:DataTypes.JSON,
    supercify:DataTypes.INTEGER,
    capacity:DataTypes.INTEGER,
});
}
