// Sequelize Init
const { Sequelize, DataTypes } = require('sequelize');
let setDataSample = require('./setDataSample')
// Switch for debug Only
setDataSample = require('./setDataSample_Prof');

// Connect & Authificate DataBase
const sequelize = new Sequelize('coworking_07_2023', 'root', 'cV$e&alj85k9kdSQ@N', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// Authenticate & Connect Database
sequelize.authenticate()
    .then(() => console.log(
        'La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(
        `Impossible de se connecter à la base de données ${error}`));
// sequelize.sync()

// Table define
const defineCoworkingModel = require('../models/coworkingModelDefinition');
const defineRoleModel = require('../models/userRoleModelDefenition');
const defineUserModel = require('../models/userModelDefinition');
const defineReviewModel = require('../models/reviewModelDefinition');
// Table Set
const RoleModel = defineRoleModel(sequelize, DataTypes);
const UserModel = defineUserModel(sequelize, DataTypes);
const CoworkingModel = defineCoworkingModel(sequelize, DataTypes);
        // table Review
const ReviewModel = defineReviewModel(sequelize, DataTypes)

// Table Foreign Key Link between us
    // User & Role Model
RoleModel.hasMany(UserModel); // join right role model user model
UserModel.belongsTo(RoleModel) // join left role model user model => 
    // User & Review
UserModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});
    // Review
ReviewModel.belongsTo(UserModel);

UserModel.hasMany(CoworkingModel, {
    foreignKey: {
        allowNull: false
    }
});
CoworkingModel.belongsTo(UserModel);

CoworkingModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});
ReviewModel.belongsTo(CoworkingModel);


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
            // Set Sample data
            setDataSample(CoworkingModel, UserModel, RoleModel, ReviewModel);
        });
};
// Export Variables and functions
module.exports = {
    initDb, CoworkingModel, UserModel, RoleModel, ReviewModel, sequelize
};