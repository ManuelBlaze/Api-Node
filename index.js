const express = require('express');
const conectarBD = require('./config/db');

//Crear server
const app = express();

//Conectar a al bd
conectarBD();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PRT || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//Arrancar el server
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});