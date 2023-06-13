const pgPromise = require ('pg-promise')
const config = {
    host: 'localhost',
    port: '5432',
    database: 'CxC',
    user: 'postgres',
    password: 'theo123'
};
const pgp = pgPromise({})
const db = pgp(config)

// const result = db.any('Select * from pizzas;');
// console.log(result);

//db.any('Select * from pizzas;').then(res => {console.table(res)});

//db.any('SELECT p.name "Pizza Nombre", i.name Ingrediente, pi.quantity, i.calories FROM pizzas p, pizza_ingredients pi, ingredients i WHERE p.id = pi.pizza_id and pi.ingredient_id = i.id;').then(res => {console.table(res)});

exports.db = db


