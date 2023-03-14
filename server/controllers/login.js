// controlador para hacer un login
const bcryptjs = require("bcryptjs");
const models = require("../../database/models");
const jwt = require("jsonwebtoken");


const { JWT } = require("../../config/config")
const login = async(req, res) => {
    try {
        const { body } = req;
        // Buscar en la BD un registro con el username que llegue en body
        // comparar contraseñas
        const findUser = await models.users.findOne({
            where: {
                username: body.username,
            },
        });

        if(!findUser) return res.status(404).send("No se encontro usuraio con ese username");

        if(!bcryptjs.compareSync(body.password, findUser.password))
        return res.status(404).send("La contraseña no coincide");

        // las contraseñas no se muestran en el objeto
        delete findUser.dataValues.password;        

        const token = jwt.sign({ userId:findUser.id }, JWT.SEED, {expiresIn: JWT.EXPIRES} );

        return res.status(200).send({data:findUser, token:token,});   
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lo sentimos ha ocurrido un error interno en el servidor");
    }
}

module.exports = { login }
