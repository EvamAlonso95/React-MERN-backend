/*
    Rutas de EVENTOS / Events
    host + /api/events
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, actualizarEventos, crearEvento, eliminarEventos } = require('../controllers/events')


//Cada peticion va a tener que validar su token - Todo Privado
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos)

// Crear un nuevo evento
router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
], crearEvento)

// Actualizar un nuevo evento
router.put('/:id', actualizarEventos)

// Eliminar un nuevo evento
router.delete('/:id', eliminarEventos)


module.exports = router;