// MAIN APP.Js

// Main Const & Define
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db/sequelize');
const app = express();
const port = 3000;

// sequelize Init
sequelize.initDb();

// Call app
app.use(express.json());
app.use(morgan('dev'));

// Init Routes
const coworkingRooter = require('./routes/coworkingRoutes');
const userRouter = require('./routes/userRoutes')
//Call Routes modules
app.use('/api/coworkings',coworkingRooter);
app.use('/api/users', userRouter);

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