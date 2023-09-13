const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

// crea una instancia de Express y se la asigna a la variable server. Se establece el nombre de la instancia como "API".
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); 
// configura el servidor para analizar datos codificados en la URL y establece un límite de tamaño de 50 megabytes para los datos analizados
server.use(bodyParser.json({ limit: '50mb' }));
// Esto configura el servidor para analizar datos JSON en las solicitudes entrantes y establece un límite de tamaño de 50 megabytes para los datos analizados.
server.use(cookieParser());
// habilita el middleware cookieParser, que permite analizar las cookies en las solicitudes entrantes. Las cookies son pequeños fragmentos de datos que pueden utilizarse para mantener el estado en aplicaciones web.
server.use(morgan('dev'));
// proporciona registros detallados de las solicitudes HTTP que llegan al servidor. Esto es útil para el seguimiento y la depuración de solicitudes entrantes.
server.use((req, res, next) => {
  // establece encabezados de respuesta para permitir el acceso cruzado (CORS) a la aplicación desde un dominio específico

  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
}); 
// Se define un middleware de manejo de errores que captura los errores en las solicitudes y responde con un código de estado y un mensaje de error apropiados. Esto ayuda a manejar las excepciones que pueden ocurrir durante el procesamiento de las solicitudes.

module.exports = server;
