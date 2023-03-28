// llamamos a los controladores
//rutas
const { Router } =  require("express");
const { login } = require("../controllers/login");
const { addCommentToPlace, getCommentByPlace, deleteComment } = require("../controllers/comments");
const { addPlace, getPlace, updatePlace, deletePlace, getPlaceOne } = require("../controllers/places")
//const { registry } = require("../controllers/users")
const { addLikeDislike } = require("../controllers/likes");
const { registry } = require("../controllers/users");
//8f14fb2eb67d5ab7cd91347920178ff6262b12e7
// requerimos una clase propia de express


const router = Router();
// creamos el enpoint para agregar un place
// router.post("/place", addPlace);

// vamos a proteger una ruta con el jwt
const { verifyToken } = require("../middlewares/auth");

// en esta ruta se llaman todos los metodos: post, get

// agrega un token antes de agregar un lugar
// router.route("/places").post(verifyToken, addPlace).get(getPlace);

// NO usa token
router.route("/places").post(addPlace).get(getPlace);


// ruta para ver un solo lugar
router.route("/places/:placeId").get(getPlaceOne);


// ruta para actualizar 
router.put("/places/:placeId", updatePlace);


// ruta para eliminar un lugar
router.delete("/places/:placeId", deletePlace);

//ruta para agregar un comentario
// router.post("/comments", verifyToken, addCommentToPlace);

router.post("/comments", addCommentToPlace);

// ruta para listar los comentarios
router.get("/comments/:placeId", getCommentByPlace);

// ruta para eliminar un comentario
router.delete("/comments/:commentId", deleteComment);

// ruta para dar likes
// router.post("/likes", verifyToken, addLikeDislike);

router.post("/likes", addLikeDislike);

// ruta para registrar un usuario
router.post("/registry", registry);

// ruta para login
router.post("/login", login);




//ruta para eliminar
router.delete("/places/:placeId", deletePlace);

//ruta agregar comentario
//router.post("/comments", verifyToken, addCommentToPlace);
//router.get("/comments/:placeId", getCommentsByPlace);
//router.delete("/comments/:commentId",deleteComment);

//ruta agregar, quitar like
//router.post("/likes", addLikeDislike);

//registro de usuario
//router.post("/registry", registry);

//login de usuario
//router.post("/login", login);
//8f14fb2eb67d5ab7cd91347920178ff6262b12e7
module.exports = { router };