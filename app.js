// MAIN APP.Js

// Main Const & Define
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db/sequelize');
// Librairie Node permettant de gérer les adresses liens sources
const path = require('path')
const app = express();
const port = 3000;

// sequelize Init
sequelize.initDb();

// Call app
app.use(express.json());
app.use(morgan('dev'));


// Init Routes
const coworkingRooter = require('./routes/coworkingRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
//Call Routes modules
app.use('/api/coworkings',coworkingRooter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// utilisation de path & gestion du dossier à l'adresse /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Default request : 
app.use((req, res) =>{
    // If bad Resquest, return this Middleware
    res.status(404).json({ message: `L'url demandé n'existe pas`})
});

//Listen
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
})


/*
app.post('/api/coworkings', (req, res) =>{
    console.log(req.body);
    return  res.json({"message": req.body});   
    //return  res.json({"message": 'POST request to the Homepage'});   
});*/