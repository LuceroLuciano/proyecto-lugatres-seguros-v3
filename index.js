// probando repositorio con Azure app service
// este es otra pruema mas para ver si funciona
// v3--
const express = require('express');
const cors = require('cors');
const {PORT} = require("./config/config");
const {db} = require("./config/database");

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
  
app.use(cors(corsOptions));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
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