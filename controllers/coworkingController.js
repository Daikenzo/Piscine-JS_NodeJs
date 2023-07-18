// Coworking Controllers
const mockCoworkings = require('../db/mock-coworkings');

exports.findAllCoworkings = (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    const orderBy = req.query.orderBy || 'ASC'
    const arrToSort = [...mockCoworkings];
    const nosort = req.query.nosort

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
    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id)) ;
    
    targetCoworking ? (res.json({  
        Message: `Info du coworking N°${targetCoworking.id} récupéré`, data:targetCoworking
    })) : ( 
        res.json({message: `Le coworking N°${req.params.id} n'existe pas.`
        }));
};

exports.createCoworking = (req, res) =>{
    // Create New Item with increment id
    // on ajoute à un nouvel objet {} un id unique, en l'occurrence égal au dernier id du mock-coworkings auquel on ajoute 1
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = { id: newId, ...req.body }
    // Insert Data object Info
    mockCoworkings.push(newCoworking)
    return res.json({ message: 
       `Un nouveau coworking n°${newCoworking.id} a été créé.`,
       data: newCoworking });
}

exports.updateCoworking = (req, res) =>{
    // Init Object Id
    const indexIntArray = mockCoworkings.findIndex((element) =>{
        return  element.id === parseInt(req.params.id)
    })
    // storage Updated Data
    let = updatedCoworking = {...mockCoworkings[indexIntArray], ...req.body};
    mockCoworkings[indexIntArray] = updatedCoworking;
    // Check Id & Update
    if(indexIntArray !== -1){
        return res.json({message: `le coworking N°${updatedCoworking.id} :
        ${updatedCoworking.name} a été modifié`,
            data:updatedCoworking
        });
    } else{
        return res.json({message: 
            `le coworking N°${req.params.id} n'existe pas.`
        });
    }
};

exports.deleteCoworking = (req, res) =>{
    // Check Id & Storage Old Object Info
    const indexIntArray = mockCoworkings.findIndex((element) =>{
        return  element.id === parseInt(req.params.id)
    })

    /*Old
    // if (mockCoworkings[indexIntArray].id !== null){
        // delete mockCoworkings[indexIntArray]
    // }  else{
        // return res.json({
            // // message: `Le coworking N°${deletedCoworkings.id} n'existe pas ou a déjà été supprimé`});
    // }    */

    // Check & Delete Queries demand
    if(indexIntArray === -1){
        return res.json({
            message: 
            `Le coworking N°${req.params.id} n'existe pas ou a déjà été supprimé`});
    } else {
        let deletedCoworkings = {...mockCoworkings[indexIntArray], ...req.body};
        mockCoworkings.splice(indexIntArray, 1);
        return  res.json(
            {message: `Le coworking N°${deletedCoworkings.id}: ${deletedCoworkings.name} a été suprimé`, data:deletedCoworkings});
    }
};