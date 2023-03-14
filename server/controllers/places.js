// enpoints
//const { json } = require("sequelize");
const models = require("../../database/models");
const {fileUpload} = require("../utils/uploadFiles");

//(const { fileUpload } = require("../utils/uploadFiles");

// función-controlador para agregar un lugar
const addPlace = async(req, res) => {
    try {
        // el userId es el que se va a guardar en el modelo place userId
        const { body, userId } = req;

        let image = fileUpload(body.image, "/public");
        console.log("IMAGEN ES =>" + image)
        //image = `http://localhost:5050${image}`
        image = `https://lugaressegurosv3.azurewebsites.net${image}`

        // crear la direccion insertando datos como SQL INSERT
        const address = await models.addresses.create({
            state:body.state,
            city:body.city,
            suburb:body.suburb,
            street:body.street,
            postal_code:body.postal_code
        });
        console.log(`Address contiene ${JSON.stringify(address)}`);

        // crea el registro en la BD como si fuera SQL - INSERT
        const place = await models.places.create({
            name: body.name,
            description: body.description,
            image: body.image,
            addressId: address.id, // crea la relación para insertar el id de la dirección
            image,
            userId: userId,
            statusDelete: body.statusDelete
        });
        return res.status(201).send(place);
    } catch (error) {
        console.log("===============Este es el error: ============")
        console.log(error);
        return res.status(500).send("Lo sentimos ha ocurrido un error en el servidor....");
    };
};


// función para mostrar la lista de los lugares
const getPlace = async(req, res) => {
    try {
        // guarda la lista de lugares
        const places = await models.places.findAll({
            include: [
                {
                model: models.addresses, // este es el modelo que quiero unir
                // estos son los atributos que quiero excluir
                attributes:{exclude: ["updatedAt"] },
                }, 
                {
                    model:models.likes,
                    // defino que atributos quiero que traiga este modelo
                    attributes:["id","isLike","userId"],

                },
            ],
        });
        return res.status(200).send(places);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lo sentimos ha ocurrido un error :(")
    };
};

// función para actualiza run lugar(place)
const updatePlace = async(req, res) => {
    try {
        // 1. Que lugar es el que quiero actualizar?
        const { placeId } = req.params; // se obtiene el id del place
        const { body } = req;
        console.log(body);
        // 2. Verificar que el lugar exista
        const place = await models.places.findOne({
            where: {
                id: placeId,
            },
        });

        if(!place) return res.status(404).send("El lugar no se encuentra");   
        
        // si quisieramos actualizar la dirección
        const address = await models.addresses.findOne({
            where: {
                id: place.addressId,
            },
        });
        // return res.send(address);
        // actualizamos la dirección
        if (address)
        await address.update({
            state:body.state,
            city:body.city,
            suburb:body.suburb,
            street:body.street,
            postCode:body.postCode
        });
        
        // 3. Actualizar datos        
        await place.update({
            name:body.name,
            description:body.description,
        });

        // 4. Devolver una respuesta
        return res.status(200).send(place);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Lo sentimos a ocurrido un error :(");
    };
};
// función para borrar un lugar
const deletePlace = async (req, res) => {
    try {
        // 1. Que lugar es el que quiero eliminar?
        const { placeId } = req.params; // se obtiene el id del place

        // 2. Verificar que el lugar exista
        const place = await models.places.findOne({
            where: {
                id: placeId,
                statusDelete: false,
            },
        });
        if(!place) return res.status(404).send("El lugar no se encuentra");  
        
        // actualiza el estatusDelete del lugar a true
        await place.update({
            statusDelete: true
        });

        // Devuelve una respuesta 
        return res.status(200).send("Se ha eliminado el place")
        
    } catch(error) {
        console.log(error)
        return res.status(500).send("Lo sentimos ocurrio un error en el servidor :(");
    }
}

module.exports = { addPlace, getPlace, updatePlace, deletePlace };
