// Library
const mockCoworkings = require('./src/lib/mock-coworkings');

// Main App - App.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/coworkings/:id', (req, res)=>{
    console.log(mockCoworkings)
    // return
    res.send(`welcome to homepage, voici la requette: ${req.params.id   }`); // return text
});

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`);
})

