const { Dog, Temperaments } = require('../db');
const {getAllDogs} = require('./getAllDogs');


async function getDogById(req, res) {
try {
    const { id } = req.params;
    const allDogs = await getAllDogs();

        const findDog = allDogs.filter((dog) => dog.id == id);
        if(findDog.length <= 0) throw new Error ('Your little friend was not found');
        
        return res.status(200).json(findDog);
    
} catch (error) {
    return res.status(404).send(error.message);
}
    
};

// Los controladores manejan toda la logica de las rutas

module.exports = getDogById;