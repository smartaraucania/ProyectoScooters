'use strict'
const mongoose = require('mongoose');
const User = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

//Obtiene todos los usuarios registrados
function getUsers(req,res){
   User.find({},(err,usuarios)=>{
        if(err) return res.status(500).send({message:`Error al conectar al servidor: ${err}`})
        if(!usuarios) return res.status(404).send({message:'No hay usuario registrados'})

        return res.status(200).send({usuarios:usuarios})
    })
}

//Obtiene un usuario segun su id
function getUserId(req,res) {
    let userId = req.params.userId;

    User.findById(userId).exec((err, usuario)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });

        res.status(200).send(usuario);
    });
}

//Obtiene un usuario segun su telefono
function getUserFono(req,res) {
    let fono = req.params.fono;
    User.findOne({
        telefono : fono
    }).exec((err, usuario)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con ese telefono" });

        res.status(200).send(usuario);
    });
}

//Ontiene un usuario segun su email
function getUserEmail(req,res) {
    let email = req.params.email;
    User.findOne({
        email : email
    }).exec((err, usuario)=>{
        if(err) return res.status(500).send({message: `Error al conectar al servidor: ${err}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con ese email" });

        res.status(200).send(usuario);
    });
}

//Elimina usuario segun su id
function deleteUser(req,res) {
    let usuarioId = req.params.usuarioId;

    User.findById(usuarioId, (err,usuario)=>{
        if(err) return res.status(500).send({message: `Error con el servidor: ${err}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
        usuario.remove(err=>{
            if(err) return res.status(500).send({'Error':`No se pudo borrar usuario ${err}`});
            res.status(200).send({message:'Usuario eliminado correctamente'});
        });       
    });
}

//Modifica un usuario logeado
function updateUser(req,res) {
    User.findById(req.user.id).exec((err,user)=>{
        if (err) return res.status(500).send(err.message);
        if(!user) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
        user.telefono= req.body.telefono,
        user.nombre= req.body.nombre,
        user.apellido= req.body.apellido,
        user.fechaNacimiento= req.body.fechaNacimiento,
        user.email= req.body.email


        user.save((err)=>{
            if (err) return res.status(401).send({'Error':`Error con el servidor: ${err}`});

            return res.status(200).send(user);
        });
    })
}

//Obtiene al usuario logueado
function me(req, res) {
    User.findById(req.user.id).select('+rol').exec((err,usuario)=>{
        if(err) return res.status(500).send({message: `Request: ${req}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
        return res.status(200).send(usuario);
    });
}

//Cambiar contraseña del usuario logeado
function editPass(req, res) {
    var oldPassword=req.body.oldPassword || '';
    var newPassword=req.body.newPassword || '';
    var confirmPasword=req.body.confirmPasword || '';

    User.findById(req.user.id).select('+password').exec((err,user)=>{
        if (err) return res.status(500).send(err.message);
        if(oldPassword=='' || newPassword=='' || confirmPasword=='') return res.status(400).send({'Error':"ingrese datos necesarios"});
        if(!bcrypt.compareSync(oldPassword, user.password)) return res.status(400).send({'Error':"Contraseña antigua incorrecta"});
        if(newPassword != confirmPasword) return res.status(400).send({'Error':"Las contraseñas no coinciden"});
        user.password=bcrypt.hashSync(newPassword, salt);    
        user.save((err)=>{
            if (err) return res.status(401).send({'Error':"Un error ha ocurrido con la Base de datos"});
            return res.status(200).send(user);
        });
    });   
}

function getSaldo(req, res){
    User.findById(req.user.id).exec((err,usuario)=>{
        if(err) return res.status(500).send({message: `Request: ${req}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
        return res.status(200).send({saldo:usuario.saldo});
    });
}

function setsaldo(req, res){
    var newSaldo=req.body.saldo || '';
    if(newSaldo==''){
        return res.status(501).send({message: `Campos obligatorios`});
    }
    User.findById(req.user.id).exec((err,usuario)=>{
        if(err) return res.status(500).send({message: `Request: ${req}`});
        if(!usuario) return res.status(404).send({"Error": "No es encontro usuario con esa id" });
        usuario.saldo=newSaldo;
        usuario.save((err)=>{
            if (err) return res.status(401).send({'Error':"Un error ha ocurrido con la Base de datos"});
            return res.status(200).send(usuario);
        });
    });
}


module.exports={
    getUsers,
    getUserId,
    getUserFono,
    getUserEmail,
    deleteUser,
    updateUser,
    me,
    editPass,
    getSaldo,
    setsaldo
}