// importa todos los modelos
const models = require("../../database/models");

const addLikeDislike = async (req, res) => {
    try {
        const { body, userId } = req;
        // primero validamos si existe el lugar
        const existPlace = await models.places.findOne({
            where: {
                id: body.placeId,
                statusDelete: false,
            },
        });
        
        if(!existPlace) return res.status(404).send("El lugar no existe");

        const addLikeDislike = await models.likes.create({
            isLike: body.isLike,
            placeId: body.placeId,
            userId
        });

        return res.status(201).send(addLikeDislike);
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}

module.exports = { addLikeDislike };
