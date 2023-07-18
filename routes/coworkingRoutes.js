// Routes Coworking Files
const express = require('express')
const router = express.Router()

//Library
const mockCoworkings = require('../db/mock-coworkings');

// Queries
router
    .route('/')
    .get((req, res) => {
        const criterium = req.query.criterium ? req.query.criterium : 'superficy'
        const orderBy = req.query.orderBy || 'ASC'
        const arrToSort = [...mockCoworkings];
        const nosort = req.query.nosort

        if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

            arrToSort.sort((a, b) => {
                return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
            })
        }
        res.json({ message: 'La liste des coworkings a bien été récupérée.', data: arrToSort })
    })
    .post((req, res) => {
        // on ajoute à un nouvel objet {} un id unique, en l'occurrence égal au dernier id du mock-coworkings auquel on ajoute 1
        const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
        const newCoworking = { id: newId, ...req.body }
        mockCoworkings.push(newCoworking)
        return res.json({ message: `Un nouveau coworking n°${newCoworking.id} a été créé.`, data: newCoworking })
    })

router
    .route('/:id')
    .get((req, res)=>{
    
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
        let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id)) ;
    
        //console.log(req.params.name);
        // return
        // res.send(`welcome to homepage, voici la requette: ${targetCoworking.name}`); // return text
        //console.log("Request", req);
        
        //res.send(`Nom du coworking: ${targetCoworking ? targetCoworking.name :  'inconnu'}`);
        
        targetCoworking ? (res.json({  
            Message: `Info du coworking N°${targetCoworking.id} récupéré`, data:targetCoworking
        })) : (
            res.json({message:`Le coworking N°${req.params.id} n'existe pas.`
        }));
    
    })
    .put((req, res) =>{
        const indexIntArray = mockCoworkings.findIndex((element) =>{
            return  element.id === parseInt(req.params.id)
        })
        let = updatedCoworking = {...mockCoworkings[indexIntArray], ...req.body};
    
        mockCoworkings[indexIntArray] = updatedCoworking;
    
        if(indexIntArray !== -1){
            return res.json({message: `le coworking N°${updatedCoworking.id} : ${updatedCoworking.name} a été modifié`, data:updatedCoworking});
        } else{
            return res.json({message: `le coworking N°${req.params.id} n'existe pas.`});
        }
        
    })
    .delete((req, res) =>{
        const indexIntArray = mockCoworkings.findIndex((element) =>{
            return  element.id === parseInt(req.params.id)
        })
        let coworkingDeleted = {...mockCoworkings[indexIntArray], ...req.body};
    
        /*
        if (mockCoworkings[indexIntArray].id !== null){
            delete mockCoworkings[indexIntArray]
        }  else{
            return res.json({
                message: `Le coworking N°${coworkingDeleted.id} n'existe pas ou a déjà été supprimé`});
        }*/
        if(indexIntArray === -1){
            return res.json({
                message: `Le coworking N°${req.params.id} n'existe pas ou a déjà été supprimé`});
        } else {
            mockCoworkings.splice(indexIntArray, 1);
            return  res.json(
                {message: `Le coworking N°${coworkingDeleted.id}: ${coworkingDeleted.name} a été suprimé`, data:coworkingDeleted});
        }
    })

// Export
module.exports = router;