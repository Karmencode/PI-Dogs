require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const { Dog, Temperaments } = require('../db');
const URL = "https://api.thedogapi.com/v1/breeds/";

async function getAllDogsApi() {

    // petición a la API 
    const { data } = await axios(`${URL}?api_key=${API_KEY}`);

        let dogsApi = data.map((dog) => {
            return {
                id: dog.id,
                image: dog.reference_image_id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                temperament: dog.temperament,
                life_span: dog.life_span,
            }
        })

        return dogsApi;
    
}

async function getAllDogsDb() {
    let allDogsDb = await Dog.findAll({
        include:{
            model: Temperaments,
            atributes: ['name'],
            through:{
                attributes: [],
            }
        }
    })

        let dogsDb = allDogsDb.map((dog) => {
            return {
                id: dog.id,
                image: dog.image,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                temperament: dog.temperament,
                life_span: dog.life_span
            }
        })

        return dogsDb;

}


const getAllDogs = async () =>{
    try {
        let dbDogs = await getAllDogsDb();
        let apiDogs = await getAllDogsApi();

        if(!dbDogs || !apiDogs) throw new Error('Error loading data');
    
        let allDogs = apiDogs.concat(dbDogs);
        return allDogs;
        
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

// Los controladores manejan toda la logica de las rutas

module.exports = {
getAllDogs,
getAllDogsApi,
getAllDogsDb};