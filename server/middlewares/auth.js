// función para verificar el token
const jwt = require("jsonwebtoken");
const decode = require("jsonwebtoken/decode");

const { JWT } = require("../../config/config");

const verifyToken = async(req, res, next) => {
    try {
        const token = req.get("X-AUTH-TOKEN");
        const decoded = jwt.verify(token, JWT.SEED);
        // console.error(`EL TOKEN CONTIENE: ${JSON.stringify(decoded)}`);
        req.userId = decoded.userId;
        next(); // aqui ya pasa el controler hacia el controlador 
    } catch (error) {
        console.log(error);
        return res.status(401).send(error.message);
    };
};

module.exports = { verifyToken };
