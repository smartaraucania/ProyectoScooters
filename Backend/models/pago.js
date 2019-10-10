'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PagoSchema = Schema({
    total : {type: Number, required:true},
    tipo: {type: String, required:true,enum:['debito','credito']},
    numero:{type:String},
    usuario:[{type:mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
});
module.exports = mongoose.model('Pago', PagoSchema);