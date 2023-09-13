const {Dog, Temperaments} = require('../db');
const {getAllDogsApi} = require('./getAllDogs');


async function postDog(req, res) {
try {
    const {image, name, height, weight, life_span, temperament} = req.body;
    // console.log(req.doby);
    // console.log(image);
    // console.log(name);
    // console.log(height);
    // console.log(weight);
    // console.log(life_span);
    // console.log(temperament);

    // Fijarse si el temperamento esta en la DB
    let temperamentDb = await Temperaments.findOne({where:{name: temperament}});
    // Fijarse si el dog ya existe en la Api
    let dogNameApi = await getAllDogsApi().then((dog) => dog.find((dog) => dog.name === name));
    
    // VALIDACIONES
    if (!image || !name || !height || !weight || !life_span || !temperament){
        return res.status(400).send('Your dog is not complete, data is missing');  
    }else if(temperamentDb === null){
        return res.status(400).send('Invalid Temperament');  
    }
    
    // Buscar o Crear el perro
    const [dog, created] = await Dog.findOrCreate({where:{image, name, height, weight, life_span}});

    // si created es true significa que ya habia un perro con estos datos por lo tanto regresamos que ya existe
    if (!created || dogNameApi) return res.status(404).send('The dog already exist');

    // busca el temperamento en la DB para asociarlo al perro
    let tempeDb = await Temperaments.findAll({
        where: {name:temperament}
    })
// Relacion entre modelo dog y temperaments(asocia los temperamentos al perro)
    await dog.addTemperaments(tempeDb);

    return res.status(200).json({dog: dog, message:'The dog was created successfully'});
} catch (error) {
    return res.status(500).send(error.message);
}

}

// Dog.create({
//     name, image, height, weight
// }).then(async (dog) =>{
//     const temp = await Temperaments.findAll({
//         where:{name: temperament}
//     });

//     await dog.addTemperament(temp);
//     res.status(200).json(dog);
// })

module.exports = postDog;