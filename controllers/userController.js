// Users Controllers
const { UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const {UserModel} = require('../db/sequelize')

// Controllers Defenitions

// Find all Table
exports.findAllUsers = (req, res) => {
    UserModel
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
    UserModel
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

// Update Object
exports.updateUser = (req, res) =>{
    // Check Id Object
    UserModel
        .findByPk(req.params.id)
        .then(result =>{
            if(!result){
                throw new Error(`l'utilisateur ${req.params.id} n'existe pas.`)
            }else{
                // Update
                bcrypt.hash(req.body.password, 10)
                    .then(hash =>{
                        const dataUser = {...req.body, password: hash}
                        return result
                        .update(dataUser)
                        .then(() =>{
                            res.json({message: 
                                `l'utilisateur ${result.dataValues.username} a été modifié`,
                                data:result});
                            });
                    })
            };
        })
        .catch(error =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });
}
// Delete Object
exports.deleteUser = (req, res) =>{
    // Check Id
    UserModel
        .findByPk(req.params.id)
        .then(result =>{
            // Check User ID
            if (!result){   return res.status(400).json(
                {message:
                    `l'utilisateur N°${req.params.id} n'existe pas ou a déjà été supprimé`
                });
            } else{
                // Delete User
                return result
                    .destroy({
                        where:{
                            id: req.params.id
                        }
                    })
                    .then(()=>{
                        res.status(200).json({ // Coworking Deleted
                            message: `l'utilisateur ${result.dataValues.username} a été suprimé`, 
                            data:result
                        });
                    });
            };
        })
        .catch(error =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`})
        });
}