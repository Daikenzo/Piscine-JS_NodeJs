// Authentificator Controllers
const { UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const {UserModel} = require('../db/sequelize')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clé_secrete';

// Create Object
exports.signUp = (req, res) =>{
    //Init bcrypt Hash
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            // Store & Inser Body Request Data
            const dataUser = {...req.body, password: hash};
            console.log(dataUser)
            return UserModel
                .create(
                    dataUser
                )
                .then(user =>{
                    res.status(201).json({ message: 
                        `l'utilisateur ${user.username} a été créé.`,
                        data:user});
                })
        })
        .catch(error =>{
            const cleanMessage = error.message.split(': ')[1]
            if (error.name === "SequelizeUniqueConstraintError" || error instanceof UniqueConstraintError){
                const messageRescue = 
                `${error.name}: Le nom est déjà pris.`;
                //console.log(error.name)
                if (error.message === "Validation error"){
                    return res.status(400).json({ message: messageRescue})}
                } else{
                    return res.status(400).json({ message: `${cleanMessage}`})
                }
            if ( error instanceof ValidationError) {
                return res.status(400).json({ message: cleanMessage })
            } 
            res.status(500).json({ message: 
                `${error}`})
        });
}
// Sign In
exports.login = (req, res) => {
    const token = jwt.sign({
        data:'foobar'
    }, SECRET_KEY, {expiresIn: 60 * 60})
    res.json({ message: 'route du Login succeful', data:token })
}
// User Acess Protect
exports.protect = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if (token){
        console.log(token)
        const decoded = jwt.verify(token, SECRET_KEY); //token, clé secrete
        res.json(decoded);
        next()
    }
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        next()
    }{
        return res.status(401).json({message:`Vous avez pas l'autorization d'accéder`});
    }
}