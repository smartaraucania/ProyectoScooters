'use strict'

const mongoose = require('mongoose');
const User = require('../models/usuario');
const Service = require('../services/services');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

//metodo que permite registrar un nuevo usuario en el sistema
function registrarUsuario(req, res){
    
    //Valida que exista solo un usuario con el mismo numero de telefono
    User.findOne({
        telefono: req.body.telefono
    }).exec((err, userTel)=>{
        if (err) return res.status(500).send(err.message);

        if (userTel!=null) return res.status(401).send({
            'Error':'Ya existe usuario con ese número telefonico'
        });
        
        User.findOne({
            email:req.body.email
        }).exec((err,userEmail)=>{
            if (err) return res.status(500).send(err.message);

            if (userEmail!=null) return res.status(402).send({
                'Error':'Ya existe usuario con ese email'
            });
        
            var hashPass = bcrypt.hashSync(req.body.password, salt);

                const user = new User({
                    telefono: req.body.telefono,
                    email: req.body.email,
                    rol: 1,
                    password: hashPass
                })
            
                user.save((err)=>{
                    if(err) return res.status(500).send({'Error':`Error al crear usuario `+err});
            
                    return res.status(200).send({'user':user});
                });
        })

    });
       
}

//metodo que permite logearse al sistema
function loginUsuario(req, res){

    User.findOne({
        telefono: req.body.telefono
    }).select('+password +rol').exec((err,user)=>{
        if(err) return res.status(500).send(err.message);

        if(user == null) return res.status(404).send({
            "error": "Usuario no encontrado"
        });

        bcrypt.compare(req.body.password,user.password,(err,decrypt)=>{
            
            if (err) return res.status(500).send(err.message);

            if(decrypt){
               
               var token = Service.createToken(user);
               user.token = token;

               user.save( (err, user) =>{
                if (err) {
                    return res.status(401).send({
                        "error": "Un error ha ocurrido con la Base de datos"
                    });
                }

                return res.status(200).send({
                    "token": token
                    });
                });

            }else{
                return res.status(401).send({
                    "error": "Contraseña no corresponde"
                });   
            }
        });
    });
}

module.exports = {
    registrarUsuario,
    loginUsuario
}