'use strict'

const mongoose = require('mongoose');
const Historial = require('../models/historial');
const User = require('../models/usuario');
const Scooter= require('../models/scooter')
const moment=require('moment')

//Muestra todos los historiales 
function getAllHistorial(req, res) {
    Historial.find().populate('usuario scooter').exec((err,historial)=>{
        if(err) return res.status(500).send({message: `Error con el servidor : ${err}`});
        if(!historial) return res.status(404).send({message: "No hay registros"});
        return res.status(200).send(historial);
    });
}

//Muestra un historial segun su id
function getHistorial(req, res) {
    let historialId = req.params.historialId;
    Historial.findById(historialId).populate('usuario scooter').exec((err,historial)=>{
        if(err) return res.status(500).send({message: `Error con el servidor : ${err}`});
        if(!historial) return res.status(404).send({message: "No hay registros"});
        return res.status(200).send(historial);
    });
}

//Elimina un historial segun su Id
function deleteHistorial(req, res) {
    let hitorialid=req.params.historialId    
    Historial.findById(hitorialid, (err,historial)=>{
        if(err) return res.status(500).send({message: `Error con el servidor: ${err}`});
        if(!historial) return res.status(404).send({"Error": "No es encontro scooter con esa id" });
        historial.remove(err=>{
            if(err) return res.status(500).send({'Error':`No se pudo borrar metodo de pago ${err}`});
            res.status(200).send({message:'Historial eliminado correctamente'});
        });       
    });
}

//Registra el inicio de una peticion
function registrarInicio(req, res){  
    const historial = new Historial({
        fechaInicio : req.body.fecha,
        usuario: req.user.id,
        scooter: req.body.scooter,
        longitudInicial: req.body.longitud,
        latitudInicial: req.body.latitud
    })
    User.findById(historial.usuario).exec((err, usuario)=>{
        if(err) return res.status(501).send({message: `Error al conectar al servidor: ${err}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
    });
    Scooter.findById(historial.scooter).exec((err, scooter)=>{
        if(err) return res.status(502).send({message: `Error al conectar al servidor: ${err}`});
        if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });
        if(scooter.estado) return res.status(401).send({"Error": "scooter no disponible" });
        if(!scooter.estado){
            scooter.estado=true
        }
        scooter.save((err)=>{
            if(err)return res.status(504).send({'Error':`Error al modifciar scooter `+err});
        })        
    });
    historial.save((err,historial)=>{
        if(err) return res.status(503).send({'Error':`Error al crear historial `+err});
        return res.status(200).send({'historial':historial});
    });
   
}

//Registra el termino de una peticion
function registrarTermino(req, res){
   let idHistorial = req.body.registro
   Historial.findById(idHistorial).exec((err,historial)=>{
    if(err) return res.status(500).send({message: `Error con el servidor : ${err}`});
    if(!historial) return res.status(404).send({message: "No hay registros"});
    historial.fechaFin= req.body.fecha,
    historial.costo= req.body.costo,
    historial.distancia= req.body.distancia,
    historial.tiempoUso= req.body.tiempo,
    historial.latitudFinal= req.body.latitud,
    historial.longitudFinal= req.body.longitud

    User.findById(historial.usuario).exec((err,usuario)=>{
        if(err) return res.status(506).send({message: `Error al conectar al servidor: ${err}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
        usuario.saldo=(usuario.saldo)-(req.body.costo);
        usuario.save((err)=>{
            if (err) return res.status(500).send({'Error':`Error con la modificacion del saldo: ${err}`});
        })
    });

    Scooter.findById(historial.scooter).exec((err, scooter)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });
        if(scooter.estado){
            scooter.estado=false;
        }
        scooter.save((err)=>{
            if (err) return res.status(501).send({'Error':`Error con la modificacion del scooter: ${err}`});
          
        }) 
    });
    historial.save((err)=>{
        if (err) return res.status(401).send({'Error':`Error con el servidor: ${err}`});
        return res.status(200).send(historial);
    }); 
  })
}

//Modifica un historial segun su Id
function updateHistorial(req, res) {

}

module.exports = {
    registrarInicio,
    registrarTermino,
    getAllHistorial,
    getHistorial,
    updateHistorial,
    deleteHistorial
}