'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorialSchema = Schema({
    fechaInicio: {type:Date,required:true},
    fechaFin:{type:Date},
    costo:{type:Number},
    distancia:{type:Number},
    tiempoUso:{type:Number},
    usuario:[{type:mongoose.Schema.Types.ObjectId, ref: 'Usuario',required:true}],
    scooter:[{type:mongoose.Schema.Types.ObjectId, ref: 'Scooter',required:true}],
    latitudInicial:{type:String,required:true},
    longitudInicial:{type:String,required:true},
    latitudFinal:{type:String},
    longitudFinal:{type:String}
});
module.exports = mongoose.model('Historial', HistorialSchema);
