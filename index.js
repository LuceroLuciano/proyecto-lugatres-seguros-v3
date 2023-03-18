// probando repositorio con Azure app service
// este es otra pruema mas para ver si funciona
// v3--
// 
const express = require('express');
const cors = require('cors');
const {PORT} = require("./config/config");
const {db} = require("./config/database");

//const app = express();

/*app.use(cors({
    origin:'*'
})); */

//app.use(cors()); // todo el mundo
//server.use(cors());

/*const whileList = ['http://localhost:3000']
app.use(cors({ origin:[whileList ]})) */

const { server } = require("./server/index"); // importamos el servidor

db.authenticate().then(()=> {
    console.log("Database connected");
    server.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});