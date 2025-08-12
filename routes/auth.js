/*
    Rutas de USUARIOS / Auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = express.Router();

//Nuevo usuario
router.post(
    '/new',
    // middlewares
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'Elpassword debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

//Login
router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'Elpassword debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],

    loginUsuario);

// Renovar el token
router.post('/renew', validarJWT, revalidarToken);

module.exports = router;