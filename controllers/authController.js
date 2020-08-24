const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    }

    //Extraer email y password
    const { email, password } = req.body;

    try {
        //Revisar que sea un usuario registrado
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({msg: 'Incorrect email and/or password'});
        }

        //Revisar password
        const passCorrecto = await bcryptjs.compare(password, user.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: "The password you entered was incorrect" });
        }

        //Si el pass es correcto Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmación
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
};