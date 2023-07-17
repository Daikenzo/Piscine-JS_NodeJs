// SPREAD OPERATOR


// pour les tableaux
const arr1b = [2,4,7];
const arr2b = [3, 4, 6];

const newArr = [1,...arr1b, "hello", ...arr2b, "world"];

console.log(newArr);

// pour les objets

const amir = {
    name: 'amir',
    age: 36,
};

const amirWithEmeail = {
    ...amir,
    email: 'amir@example.com',
};

console.log(amirWithEmeail);

const oldAmir = {
    ...amir,
    age: 45,
};

console.log(oldAmir);

// exo 1
let result;
const arr1 = ["Bonjour", "tout", "le monde"]
const arr2 = ['Salut', 'à tous']
const arr3 = ["je m'apelle", 'mon nom est']
const arr4 = ["Paul", "Doazan"]
const arr5 = ['Antoine', "Dupont"]

const newarr1 = [...arr1,arr3[0],...arr5];
result = newarr1.join(' ');
console.log(result);
const newarr2 = [...arr2,arr3[1],...arr4];
result = newarr2.join(' ');
console.log(result);


// rest operator (danger confusion)
function sum (...params){
    let total = 0
    total += params.reduce((accumulator, currentValue) => accumulator + currentValue,
    total
  );
    return  total;
}

console.log(sum(4,5,7));