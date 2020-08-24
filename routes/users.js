//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

//Crear un usuario
// api/usuarios
router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Put a valid email').isEmail(),
        check('password', 'The password has to be min 6 characters').isLength({ min: 6 })
    ],
    userController.createUser
);

module.exports = router;