// Coworking Table define - Users
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Users', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    birthday: DataTypes.DATE,
});
}
