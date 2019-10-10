'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    telefono: { type: String, unique: true, required: true },
    nombre: { type: String },
    apellido: { type: String },
    saldo: { type: Number,default:15000 },
    password: { type: String, select: false, required: true },
    email: { type: String, required: true, unique: true },
    pago: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pago' }],
    token:{ type:String, select: false},
    rol: { type: String, enum: [1, 2], required: true, select: false },
    fechaNacimiento: { type: String }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
//Crear un Admin
var User = mongoose.model('Usuario', UsuarioSchema);
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var pass = bcrypt.hashSync('SmartUfro2019', salt);
var adminUser = new User({
    telefono: '99999999',
    nombre: 'Admin',
    apellido: 'Admin',
    password: pass,
    email: 'Undefined',
    token: String,
    rol: 2,
    fechaNacimiento: 'Undefined'
});
User.create(adminUser, function (error) {
});

