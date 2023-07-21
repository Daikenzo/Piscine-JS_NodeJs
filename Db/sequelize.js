// Sequelize Init
const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings');
const mockUsers = require('./mock-users');
const bcrypt = require('bcrypt');

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
const defineUserModel = require('../models/userModelDefinition')
const UserModel = defineUserModel(sequelize, DataTypes);

const defineCoworkingModel = require('../models/coworkingModelDefinition');
const CoworkingModel = defineCoworkingModel(sequelize, DataTypes);

// sequelize Init Insert Value
const initDb = () =>{
    // sequelize   //Users
    //     .sync({ force: true})
    //     .then(() =>{
    //         UserModel.create({
    //             username: 'jane',
    //             firstname: 'doe',
    //             birthday: new Date('september 22, 2018 15:00:00')
    //     });
    // });
    sequelize //Coworking
        .sync({ force: true})
        .then(() =>{
           mockCoworkings.forEach(coworking => {
               CoworkingModel.create({
                   "name":coworking.name,
                   "price":coworking.price,
                   "address":coworking.address,
                   "superficy":coworking.superficy,
                   "capacity":coworking.capacity,
                   "picture":coworking.picture,
                   "created":new Date(),
               })
            })
            mockUsers.forEach(user => {
                // Hash Password
                bcrypt.hash(user.password, 10)
                    .then(hash =>{
                        // Store & Inser Body Request Data
                        return UserModel.create({
                            firstname:user.firstname,
                            lastname:user.lastname,
                            username:user.username? user.username : 
                            `${user.firstname} ${user.lastname}`,
                            password:hash
                        })
                    })
            });
        })
}

module.exports = {
    initDb, CoworkingModel, UserModel
}