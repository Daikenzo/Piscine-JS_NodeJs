// Library
const mockCoworkings = require('./src/lib/mock-coworkings');

// Main App - App.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// app.get => endpoint
app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium || 'id';
    const orderBy = req.query.orderBy || 'ASC';
    const sort = req.query.sort || 'off';
    // variable complexe pour dupliquer le tableau (fonction comme une boucle for)
    // similaire à mockCoworkings.slice
    const coworkingSort = [...mockCoworkings]

    console.log(req.query)
    if (sort === 'on'){
    if (orderBy === 'ASC' || orderBy === 'DESC'){
        console.log('sort');
        coworkingSort.sort((a, b) =>{
            return orderBy === 'ASC' ? (a[criterium] - b[criterium] )
            : (b[criterium] - a[criterium] )
        });
    }}  
    if (sort === 'on'){
        return res.json(coworkingSort)
    }else{
        return res.json(mockCoworkings);
    }
});

/*
app.post('/api/coworkings', (req, res) =>{
    console.log(req.body);
    return  res.json({"message": req.body});   
    //return  res.json({"message": 'POST request to the Homepage'});   
});*/

app.get('/api/coworkings/:id', (req, res)=>{
    
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

});

app.put('/api/coworkings/:id', (req, res) =>{
    const indexIntArray = mockCoworkings.findIndex((element) =>{
        return  element.id === parseInt(req.params.id)
    })
    let = updatedCoworking = {...mockCoworkings[indexIntArray], ...req.body};

    mockCoworkings[indexIntArray] = updatedCoworking;

    if(indexIntArray === -1){
        return res.json({message: `le coworking N°${updatedCoworking.id} : ${updatedCoworking.name} a été modifié`, data:updatedCoworking});
    } else{
        return res.json({message: `le coworking N°${req.params.id} n'existe pas.`});
    }
    
})
app.post('/api/coworkings', (req, res) =>{

    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1;
    const newCoworking = {id: newId, ...req.body};
    mockCoworkings.push(newCoworking);
    return  res.json({message: `Le coworking ${newCoworking.name} (N°${newCoworking.id}) a bien été ajouté`, data: req.body}); 
    //return  res.json({"message": 'POST request to the Homepage'});   
});

app.delete('/api/coworkings/:id', (req, res) =>{
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
}
);

// Listen

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
})

