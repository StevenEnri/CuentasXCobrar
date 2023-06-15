const pgPromise = require ('pg-promise')
const config = {
    host: 'localhost',
    port: '5432',
    database: 'CuentasporCobrar',
    user: 'postgres',
    password: 'theo123'
};
const pgp = pgPromise({})
const db = pgp(config)


exports.db = db


