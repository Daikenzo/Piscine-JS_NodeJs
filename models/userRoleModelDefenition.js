// Users Role Table definition
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: DataTypes.STRING
    }, {
        updatedAt: false,
        createdAt: false
    })
}