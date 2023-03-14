// enpoint para comments
const models = require("../../database/models"); // importamos los modelos

// insertar un comentario
const addCommentToPlace = async(req, res) => {
    try {
        const { body, userId } =  req;
        //comentario
        //placeId -> Pendiente hacer validación que el place exista
        const existPlace = await models.places.findOne({
            where: {
                id: body.placeId,
                statusDelete: false,
            },
        });
       // return res.status(201).send(existPlace);
        if(!existPlace) return res.status(404).send("El lugar no existe");
        
        const comment = await models.comments.create({
            placeId: body.placeId,
            userId, 
            comment: body.comment,
        });

        return res.status(201).send(comment);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
};

// listar comentarios
const getCommentByPlace = async(req, res) =>{
    try {
        const { placeId } = req.params;

        const comments = await models.comments.findAll({
            where: {
                placeId: placeId,
                statusDelete: false,
            },
        });
        
        return res.status(200).send(comments);
        //return res.status(200).send("El comentario no existe");
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}

// borrar comentarios
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await models.comments.findOne({
            where: {
                id: commentId,
                //statusDelete: false,
            },
        });

        if(!comment) return res.status(404).send("El comentario no existe");

        await comment.update({
            statusDelete: true,
        });

        return res.status(200).send("El comentario se ha eliminado");
    } catch (error) {
        return res.status(500).send("Internal erver Error");
    }
} 


module.exports = { addCommentToPlace, getCommentByPlace, deleteComment };
