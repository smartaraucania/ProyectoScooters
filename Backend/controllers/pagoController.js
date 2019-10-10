'use strict'
const mongoose = require('mongoose');
const Pago = require('../models/pago');

//Obtiene todos los metodos de pago del ususuario logeado
function getPagos(req,res){
    let userLog=req.user.id
    Pago.find({
        usuario: userLog
    }).populate("usuario").exec((err,pagos)=>{
        if(err) return res.status(500).send({message:`Error al conectar al servidor: ${err}`})
        if(!pagos) return res.status(404).send({message:'No hay metodos de pago registrados'})

        return res.status(200).send({pagos:pagos})
    })
}

//Eliminar un metodo de pago segun si id del usuario logeado
function eliminarPago(req,res){
    let pagoid=req.params.pagoId    
    Pago.findById(pagoid, (err,pago)=>{
        if(err) return res.status(500).send({message: `Error con el servidor: ${err}`});
        if(!pago) return res.status(404).send({"Error": "No es encontro metodo de pago con esa id" });
        pago.remove(err=>{
            if(err) return res.status(500).send({'Error':`No se pudo borrar metodo de pago ${err}`});
            res.status(200).send({message:'Metodo de pago eliminado correctamente'});
        });       
    });
}

//Modifica el metodo de pago del ususuario logeado
function modificarPago(req,res){
    let pagoid=req.params.pagoId
    Pago.findById(pagoid).exec((err,pago)=>{
        if (err) return res.status(500).send(err.message);
        pago.total= req.body.total,
        pago.tipo= req.body.tipo,
        pago.numero= req.body.numero
        pago.save((err)=>{
            if (err) return res.status(401).send({'Error':`Error con el servidor: ${err}`});
            return res.status(200).send(pago);
        });
    })
}

//Crear un metodo de pago del usuario logeado
function crearPago(req,res){
    const pago = new Pago({
        total : req.body.total,
        tipo: req.body.tipo,
        numero: req.body.numero,
        usuario: req.user.id
    })
    pago.save((err)=>{
        if(err) return res.status(500).send({'Error':`Error al crear metodo de pago `+err});
        return res.status(200).send({'Metodo de pago':pago});
    });
}

module.exports={
    getPagos,
    eliminarPago,
    modificarPago,
    crearPago
}