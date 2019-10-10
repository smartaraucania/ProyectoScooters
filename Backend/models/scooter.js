'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScooterSchema = Schema({
    estado : {type: Boolean, required:true},
    modelo: {type: String, required:true},
    latitud: { type: String, required: true},
    longitud: {type: String,required:true},
    qr: {type: String}
});
module.exports = mongoose.model('Scooter', ScooterSchema);