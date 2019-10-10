'use strict'
const mongoose = require('mongoose');
const QRCode = require('qrcode')
const Scooter= require('../models/scooter')

//Generar el codigo qr del scooter con su id correspondiente
function generarQr(req,res){  
  let scooterId = req.params.scooterId;
  Scooter.findById(scooterId).exec((err, scooter)=>{
    if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
    if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });

    QRCode . toDataURL (scooterId, function ( err , url ) {
      if(err) return res.status(500).send({message:`Error al conectar al servidor: ${err}`})
      if(!url) return res.status(404).send({message:'Error al generar URL'})     
      scooter.qr=url
      scooter.save((err)=>{
        if (err) return res.status(401).send({'Error':`Error con el servidor: ${err}`});
        res.status(200).send(scooter);
      });
    })
  });
  
}

//Obtiene una lista con todos los scooter
function getScooters(req,res){
  Scooter.find({},(err,scooters)=>{
    if(err) return res.status(500).send({message:`Error al conectar al servidor: ${err}`})
    if(!scooters) return res.status(404).send({message:'No hay Scooter registrados'})
    return res.status(200).send({scooters:scooters})
  })
}

//Obtiene un scooter por su id
function getScooter(req,res){
  let scooterId = req.params.scooterId;

  Scooter.findById(scooterId).exec((err, scooter)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });

        res.status(200).send(scooter);
    });
}

//Modifica un scooter segun su id
function setScooter(req,res){
  let scooterId = req.params.scooterId;

  Scooter.findById(scooterId).exec((err, scooter)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });
        
        scooter.estado = req.body.estado,
        scooter.modelo= req.body.modelo,
        scooter.latitud= req.body.latitud,
        scooter.longitud= req.body.longitud

        scooter.save((err)=>{
        if (err) return res.status(401).send({'Error':`Error con el servidor: ${err}`});
        res.status(200).send(scooter);
        });
        
    });
}

//Elimina un scooter segun su id
function deleteScooter(req,res){
  let scooterId = req.params.scooterId;

  Scooter.findById(scooterId, (err,scooter)=>{
        if(err) return res.status(500).send({message: `Error con el servidor: ${err}`});
        if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });
        scooter.remove(err=>{
            if(err) return res.status(500).send({'Error':`No se pudo borrar scooter ${err}`});
            res.status(200).send({message:'Scooter eliminado correctamente'});
        });       
    });
}

//Crear un scooter
function createScooter(req,res){
  const scooter = new Scooter({
    estado : req.body.estado,
    modelo: req.body.modelo,
    latitud: req.body.latitud,
    longitud: req.body.longitud
  })

  scooter.save((err)=>{
      if(err) return res.status(500).send({'Error':`Error al crear scooter `+err});
      return res.status(200).send({'scooter':scooter});
  });
}

//Cambia el estado del scooter
function setEstadoScooter(req,res){
  let scooterId = req.params.scooterId;

  Scooter.findById(scooterId).exec((err, scooter)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!scooter) return res.status(404).send({"Error": "No es encontro scooter con esa id" });
        
        if(scooter.estado){
          scooter.estado=false;
        }else{
          scooter.estado=true;
        }

        scooter.save((err)=>{
        if (err) return res.status(401).send({'Error':`Error con el servidor: ${err}`});
        res.status(200).send(scooter);
        });
        
    });
}


module.exports={
    generarQr,
    getScooters,
    getScooter,
    setEstadoScooter,
    setScooter,
    deleteScooter,
    createScooter
}