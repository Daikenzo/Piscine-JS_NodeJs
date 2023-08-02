// Coworking Controllers
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const {CoworkingModel, ReviewModel, sequelize} = require('../db/sequelize');
const { query } = require('express');


exports.findAllCoworkings = (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    const orderBy = req.query.orderBy || 'ASC'
    const nosort = req.query.nosort
    // Init Table Request
   CoworkingModel
    .findAll({include: ReviewModel})
    .then((result)=>{
        res.json({ message: 
            'La liste des coworkings a bien été récupérée.',
             data: result
            });
    })
    .catch((error)=>{
        res.status(500).json({ message: 
            `Une Erreur est survenue: ${error}`
            });
    });
    /*
     const arrToSort = [...mockCoworkings];


     if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') 
     && (criterium === 'superficy' || criterium === 'capacity')) 
     {
         arrToSort.sort((a, b) => {
             return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
         })
     }
     res.json({ message: 
         'La liste des coworkings a bien été récupérée.',
          data: arrToSort
         })
         */
};

exports.findAllCoworkingsWithRaw = (req, res) => {
    // Init Table Request
   CoworkingModel
    // .findAll({include: ReviewModel})
    sequelize.query(
        "SELECT name, rating FROM `coworkings` LEFT JOIN `reviews` ON `coworkings`.`id` = `reviews`.`coworkingid`",
         {type: QueryTypes.SELECT})
        .then((result)=>{
            res.json({ message: 
            'La liste des coworkings a bien été récupérée.',
             data: result
            });
        })
        .catch((error)=>{
        res.status(500).json({ message: 
            `Une Erreur est survenue: ${error}`
            });
        }
    );
};

exports.findCoworkingByPk = (req, res)=>{
    /*Old Ver
//console.log(parseInt(req.params.id), mockCoworkings[0].name);
        // :request-element => req.params.resquest-element
        // let targetCoworking;
        // for (let i = 0; i < mockCoworkings.length; i++)
        // {
        //     const element = mockCoworkings[i];
        //     // :id => req.params.id requette req  toujours champ texte -> convert n b with parseInt
        //     if (element.id === parseInt(req.params.id)){
        //         targetCoworking = element;
        //         break;
        //     }
        // }
    //console.log(req.params.name);
        // return
        // res.send(`welcome to homepage, voici la requette: ${targetCoworking.name}`); // return text
        //console.log("Request", req);
        
        //res.send(`Nom du coworking: ${targetCoworking ? targetCoworking.name :  'inconnu'}`);
*/
    // Init Id
    //let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id)) ;
    CoworkingModel
        .findByPk(req.params.id)
        .then(targetCoworking =>{
            if(!targetCoworking){
                res.status(400).json({message: `Le coworking N°${req.params.id} n'existe pas.`});
            } else{
                res.json({message: `Le coworking N°${req.params.id} a bien été récupéré`, data:targetCoworking});
            }
        })
        .catch((error =>{
            res.json.status(500).json({message: `Une erreur est survenue: ${error}`});
        }));
};

exports.createCoworking = (req, res) =>{
    /*Old
    // Create New Item with increment id
    // on ajoute à un nouvel objet {} un id unique, en l'occurrence égal au dernier id du mock-coworkings auquel on ajoute 1
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = { id: newId, ...req.body }
    // Insert Data object Info
    mockCoworkings.push(newCoworking)*/
    
    const newCoworking = {...req.body, UserId:1};
    console.log("coworking data queries", newCoworking)
    // Insert Req body
     CoworkingModel
        .create(newCoworking)
        .then((coworking) =>{
            res.status(201).json({ message: 
                `Un nouveau coworking N°${coworking.id}: ${coworking.name}} a été créé.`,
                data: coworking }); // coworking => result
        })
        .catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError" || error instanceof UniqueConstraintError){
                //console.log(error.name)
                return res.status(400).json({ message: `Le nom est déjà pris`, type:error.name})
            } 
            if ( error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            } 
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
        })

    
}

// Creation d'un coworking avec image
exports.createCoworkingWithImage = (req, res) => {
    const newCoworking = JSON.parse(req.body.data);
    CoworkingModel
        .create({
            name: newCoworking.name,
            price: newCoworking.price,
            superficy: newCoworking.superficy,
            capacity: newCoworking.capacity,
            address: newCoworking.address,
            UserId: newCoworking.UserId,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then((result) => {
            res.status(201).json({ message: 'Un coworking a bien été ajouté.', data: result })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
        })
}

exports.updateCoworking = (req, res) =>{
    // Check Id Object
    CoworkingModel
        .findByPk(req.params.id)
        .then(result =>{
            // Updapted
            if(!result){
                throw new Error(`le coworking N°${req.params.id} n'existe pas.`)
            } else{
                return result
                    .update(req.body)
                    .then(() =>{
                        res.json({message: 
                            `le coworking N°${result.dataValues.id}: ${result.dataValues.name} a été modifié`,
                            data:result});
                        });
            };
        })
        .catch((error)=>{
            res.status(500).json({message:
                `Une Erreur est survenue: ${error}`
            });
        });
};

exports.deleteCoworking = (req, res) =>{
    // Check Id & Storage Old Object Info
    // const indexIntArray = mockCoworkings.findIndex((element) =>{
    //     return  element.id === parseInt(req.params.id)
    // })
    // Check Id 
    CoworkingModel
        .findByPk(req.params.id)
        .then(result =>{ // Check & Delete From Database
            if (!result){   return res.status(400).json(
                {message:
                    `Le coworking N°${req.params.id} n'existe pas ou a déjà été supprimé`
                });
            } else{
                return result
                    .destroy({
                        where:{
                            id: req.params.id
                        }
                    })
                    .then(()=>{
                        res.status(200).json({ // Coworking Deleted
                            message: `Le coworking N°${result.dataValues.id}: ${result.dataValues.name} a été suprimé`, data:result
                        });
                    });
            };
        })
        .catch((error) =>{
            res.status(500).json({ message: 
                `Une erreur est survenue: ${error}`});
        });
};

// Find all Coworking By Review (with ratings)
exports.findAllCoworkingsByReview = (req, res) => {
    const minRate = req.query.minRate || 4
    CoworkingModel.findAll({
        include: {
            model: ReviewModel,
            where: {
                rating: { [Op.gte]: 4 }
            }
        }
    })
        .then((elements) => {
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({ message: msg, data: elements })
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({ message: msg })
        })
}

exports.findAllCoworkingsByReviewSQL = (req, res) => {
    return sequelize.query('SELECT name, rating FROM `coworkings` LEFT JOIN `reviews` ON `coworkings`.`id` = `reviews`.`coworkingId`',
        {
            type: QueryTypes.SELECT
        }
    )
        .then(coworkings => {
            const message = `Il y a ${coworkings.length} coworkings comme résultat de la requête en SQL pur.`
            res.json({ message, data: coworkings })
        })
        .catch(error => {
            const message = `La liste des coworkings n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}