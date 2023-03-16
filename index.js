// probando repositorio con Azure app service
// este es otra pruema mas para ver si funciona
// v3--
const express = require('express');
const cors = require('cors');
const {PORT} = require("./config/config");
const {db} = require("./config/database");

const app = express();

// Utilizar el middleware de cors para todas las rutas
app.use(cors());

// Configuración de las rutas y la lógica de tu aplicación aquí

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

const { server } = require("./server/index"); // importamos el servidor

db.authenticate().then(()=> {
    console.log("Database connected");
    server.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});