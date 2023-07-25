// SPREAD OPERATOR

const { ValidationError } = require("sequelize");

// pour les tableaux

// rest operator (danger confusion)

// Promesse
const model = sayHello('sequelize', 'DataTypes');
console.log(nbResult, model)

const btn = document.querySelector('.my-btn')
btn.addEventListener('click', (event) => {
    const myFunction = (monParam) => {
        console.log(event, monParam)
    }
    myFunction()
})
// for error
// if (error instanceof ValidationError){

// }
// object classe (// Programation Orienté Objet - POO)
class   Identity{
    firstname;
    lastname;
    constructor(fParameter, lParameter){
        this.firstname = fParameter
        this.lastname = lParameter
    }
    getFirstname = () =>{
        return this.firstname;
    }
}
const myIdentity = new Identity('Paul', 'Doazan')
const myIdentity_2 = new Identity('Rachid', 'Omag')
const myIdentity_3 = new Identity('Mathilde', 'Dah')

const myNumber = 12;
if (myNumber instanceof Identity){ return false}
if (myIdentity instanceof Identity){ return true}