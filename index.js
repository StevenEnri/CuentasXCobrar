// Packages
const express = require('express')
const app = express()

// Middewears
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

// routes
app.use(require('./routes/index'))

// Server execution
app.listen(3000)
app.get('/', (req, res) => {res.send('Bienvenido al Módulo Cuentas por Cobrar')})
console.log('Server running in: http://localhost:3000');