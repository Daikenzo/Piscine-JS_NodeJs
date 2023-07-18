// MAIN APP.Js

// Main Const & Define
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db/sequelize');
const app = express();
const port = 3000;

// sequelize Init
//sequelize.initDb();

// Call app
app.use(express.json());
app.use(morgan('dev'));

//Call Routes modules
const coworkingRooter = require('./routes/coworkingRoutes');
app.use('/api/coworkings',coworkingRooter);

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