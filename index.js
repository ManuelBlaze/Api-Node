const express = require('express');
const connectDB = require('./config/db');

//Crear server
const app = express();

//Conectar a al bd
connectDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const port = process.env.PRT || 4000;

//Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/comics', require('./routes/comics'));

//Arrancar el server
app.listen(port, '0.0.0.0', () => {
    console.log(`the server is working in the port ${port}`);
});