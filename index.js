const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

// Crear el servidor de Express
const app = express();

// Database

dbConnection();

//CORS
app.use(cors());

//Directorio publico
//app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')));

//Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
// auth //crear, login, renew

// crud : Eventos
app.use('/api/events', require('./routes/events'));

// Evitar que no se encuentren las rutas de react router dom
/* app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
 */

//Internet solution

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Escuchar peticiones


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})