// Library
const mockCoworkings = require('./src/lib/mock-coworkings');

// Main App - App.js
const express = require('express');
const app = express();
const port = 3000;

// app.get => endpoint
app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium || 'id';
    const orderBy = req.query.orderBy || 'ASC';
    // variable complexe pour dupliquer le tableau (fonction comme une boucle for)
    // similaire à mockCoworkings.slice
    const coworkingSort = [...mockCoworkings]

    console.log(req.query)
    if (orderBy === 'ASC' || orderBy === 'DESC'){
        console.log('sort');
        coworkingSort.sort((a, b) =>{
            return orderBy === 'ASC' ? (a[criterium] - b[criterium] )
            : (b[criterium] - a[criterium] )
        });
    }
    
    
    res.json(coworkingSort);
});

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
    res.json({  result: `nom du coworking : ${targetCoworking ? targetCoworking : {id: 'inconnu'}}`});

});

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
})

