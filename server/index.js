//inicializar nuestro servidor
const express = require("express");
const { router } = require("./routes/index"); // importamos las rutas
const server = express();

const cors = require("cors");



// idicamos que las solicitudes van a traer algo en el código
server.use(express.json());

// middleware son funciones que se ejecutan antes de que se ejecute otra función
server.use(router);

// habilitando el cors
//server.use(cors());
server.use(cors({ origin: true, credentials: true }))
    server.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Json'
        )
        next()
    }) 





server.use("/public", express.static(__dirname + "/public"));


// exportmos la instancia del server
module.exports = { server };