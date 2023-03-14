// probando repositorio con Azure app service
// este es otra pruema mas para ver si funciona
// v3--

const {PORT} = require("./config/config");
const {db} = require("./config/database");

const { server } = require("./server/index"); // importamos el servidor

db.authenticate().then(()=> {
    console.log("Database connected");
    server.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});