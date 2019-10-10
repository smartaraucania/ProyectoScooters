'use strict'

const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');

//Metodo que crea token
function createToken(user){
    const payload = {
        id: user._id,
        name: user.nombre,
        telefono: user.telefono,
        rol: user.rol     
    }

    var token = jwt.sign(payload, config.secret,{
        expiresIn: 60 * 60 * 24 // expira en 24 horas
    });
    return token;
}

module.exports = {
    createToken
}