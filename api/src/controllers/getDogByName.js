
const { Dog } = require('../db');
const {getAllDogs} = require('./getAllDogs');


async function getDogByName(req, res) {
    try {
        const { name } = req.query;  /* Obtener el nombre por query */
        const allDogs = await getAllDogs(); /* Obtener todos los perros para filtrar */

        if(name){
            const findDogName = allDogs.filter((dog) => dog.name
            .toLowerCase() // Convertir a minuscula
            .includes(name.toLowerCase())); /* si el dog.name incluye a name devover los perros que lo contengan */
            
            if(findDogName.length){
                return res.status(200).json(findDogName);
            }else{
                return res.status(404).send('Matches not found')
            }
        }else{
            return res.status(201).json(allDogs);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }


}

module.exports = getDogByName;