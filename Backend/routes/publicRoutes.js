'use strict'

const express = require('express');
const publicRouter = express.Router();
const  usuarioController= require('../controllers/usuarioController');
const scooterController= require('../controllers/scooterController')

//Rutas del Usuario
publicRouter.get('/usuarios',usuarioController.getUsers);
publicRouter.get('/usuarios/:userId',usuarioController.getUserId);
publicRouter.get('/usuarioFono/:fono',usuarioController.getUserFono);
publicRouter.get('/usuarioEmail/:email',usuarioController.getUserEmail);

//Rutas Scooter
publicRouter.get('/scooter',scooterController.getScooters)
publicRouter.get('/scooter/:scooterId',scooterController.getScooter);

module.exports = publicRouter;