// Users Controllers
const { InstanceError, UniqueConstraintError, ValidationError } = require('sequelize');
const {UsersModel} = require('../db/sequelize')

// Controllers Defenitions

// Find all Table
exports.findAllUsers = (req, res) => {
    UsersModel
        .findAll()
        .then(result =>{
            res.json({ message: 
                'La liste des Utilisateurs a bien été récupérée.',
                 data: result});
        })
        .catch(error =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });

}
// Fin Item Table
exports.findUserByPk = (req, res)=>{
    UsersModel
        .findByPk(req.params.id)
        .then(result =>{
            if(!result){
                res.status(400).json({message:
                    `L'utilisateur N°${req.params.id} n'existe pas.`});
                } else{
                    res.json({message: `Utilisateur N°${req.params.id} a bien été récupéré`, 
                    data:result});
                }
            }
        )
        .catch(error =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });
}
// Create Object
exports.createUser = (req, res) =>{
    // Store & Inser Body Request Data
    const newUser = {...req.body };

    UsersModel
        .create({
            "firstname":req.body.firstname,
            "lastname":req.bodylastname,
            "password": req.body.password,
        })
        .then(user =>{
            res.status(201).json({ message: 
                `l'utilisateur ${user.firstname} a été créé.`,
                data:user}); // coworking => result
        })
        .catch(error =>{
            if (error.name === "SequelizeUniqueConstraintError" || error instanceof UniqueConstraintError){
                //console.log(error.name)
                return res.status(400).json({ message: `Le nom est déjà pris`, type:error.name})
            } 
            if ( error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            } 
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });
}
// Update Object
exports.updateUser = (req, res) =>{
    // Check Id Object
    UsersModel
        .findByPk(req.params.id)
        .then(result =>{

        })
        .catch(error =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });
}
// Delete Object
exports.deleteUser = (req, res) =>{
    // Check Id
    UsersModel
        .findByPk(req.params.id)
        .then(result =>{

        })
        .catch(error =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });
}