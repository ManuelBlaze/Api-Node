const express = require('express');
const conectarBD = require('./config/db');

//Crear server
const app = express();

//Conectar a al bd
conectarBD();

//Puerto de la app
const PORT = process.env.PRT || 4000;

//Arrancar el server
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})