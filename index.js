const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear el servidor de express

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())


//Directorio publico
//* Use es como un middelware, una función que se ejecuta en el momento que alguien hace una petición a mi servidor
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
//Todo lo que exportemos en routes auth sera habilitado en la primera ruta
app.use('/api/auth', require('./routes/auth'));
//TODO: Crud: Eventos
app.use('/api/events', require('./routes/events'));



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
