// Sequelize Init
const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings');

// Connect & Authificate DataBase
const sequelize = new Sequelize('coworking_07_2023', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});
sequelize.authenticate()
    .then(() => console.log(
        'La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(
        `Impossible de se connecter à la base de données ${error}`));
// sequelize.sync()

// Table define
const getUserModel = require('../models/userModel')
const UserModel = getUserModel(sequelize, DataTypes);

const getCoworkingModel = require('../models/coworkingModel');
const CoworkingModel = getCoworkingModel(sequelize, DataTypes);

// sequelize Init Insert Value
const initDb = () =>{
    sequelize   //Users
        .sync({ force: true})
        .then(() =>{
            UserModel.create({
                username: 'jane',
                firstname: 'doe',
                birthday: new Date('september 22, 2018 15:00:00')
        });
    });
    sequelize //Coworking
        .sync({ force: true})
        .then(() =>{
           mockCoworkings.forEach(coworking => {
               CoworkingModel.create({
                   "name":coworking.name,
                   "price":coworking.price,
                   "address":coworking.address,
                   "supercify":coworking.superficy,
                   "capacity":coworking.capacity,
                   "picture":coworking.picture,
                   "created":new Date()
               })
           });
    })
}

module.exports = {
    initDb, CoworkingModel
}