// const { Router } = require('express');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');


// const router = Router();
// const routesDog = require('./routesDog');
// const routesTemperament = require('./routesTemperament');

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
// router.use('/dogs', routesDog);
// router.use('/temperament', routesTemperament);


const {getAllDogs} = require('../controllers/getAllDogs');
const getDogById = require ('../controllers/getDogById');
const getDogByName = require('../controllers/getDogByName');
const postDog = require('../controllers/postDog');
const getTemperaments = require('../controllers/getTemperaments');
const { Router } = require('express');
const router = Router();


// router.get("/dogs", getAllDogs);
router.get ( "/dogs/:id", getDogById);
router.get ("/dogs", getDogByName);
router.post ( "/dogs", postDog);
router.get ( "/temperaments", getTemperaments);


module.exports = router;
