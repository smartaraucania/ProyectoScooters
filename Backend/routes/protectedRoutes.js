'use strict'

const express = require('express');
const protectedRouter = express.Router();
const usuarioController = require('../controllers/usuarioController');
const scooterController= require('../controllers/scooterController');
const historialController=require('../controllers/historialController');
const pagoController = require('../controllers/pagoController')
const middleware = require('../middlewares/middlewares');

//Rutas Usuario
protectedRouter.put('/usuarios',middleware.isAuth,usuarioController.updateUser);
protectedRouter.get('/me',middleware.isAuth,usuarioController.me);
protectedRouter.put('/editpass',middleware.isAuth,usuarioController.editPass);
protectedRouter.delete('/usuarios/:usuarioId',middleware.isAuth,middleware.HasRole(2),usuarioController.deleteUser);
protectedRouter.get('/saldo',middleware.isAuth,usuarioController.getSaldo);
protectedRouter.post('/saldo',middleware.isAuth,usuarioController.setsaldo);

//Rutas Scooter
protectedRouter.post('/scooter',middleware.isAuth,middleware.HasRole(2),scooterController.createScooter);
protectedRouter.put('/scooter/:scooterId',middleware.isAuth,middleware.HasRole(2),scooterController.setScooter);
protectedRouter.delete('/scooter/:scooterId',middleware.isAuth,middleware.HasRole(2),scooterController.deleteScooter);
protectedRouter.put('/scooterQr/:scooterId',middleware.isAuth,middleware.HasRole(2),scooterController.generarQr);
protectedRouter.put('/scooterEstado/:scooterId',middleware.isAuth,middleware.HasRole(2),scooterController.setEstadoScooter);


//Rutas historial
protectedRouter.post('/historial',middleware.isAuth,historialController.registrarInicio);
protectedRouter.post('/historialfin',middleware.isAuth,historialController.registrarTermino);
protectedRouter.get('/historial',middleware.isAuth,middleware.HasRole(2),historialController.getAllHistorial);
protectedRouter.get('/historial/:historialId',middleware.isAuth,middleware.HasRole(2),historialController.getHistorial);
protectedRouter.delete('/historial/:historialId',middleware.isAuth,middleware.HasRole(2),historialController.deleteHistorial);

//Rutas Pago
protectedRouter.get('/pago',middleware.isAuth,pagoController.getPagos);
protectedRouter.delete('/pago/:pagoId',middleware.isAuth,pagoController.eliminarPago);
protectedRouter.post('/pago',middleware.isAuth,pagoController.crearPago);
protectedRouter.put('/pago/:pagoId',middleware.isAuth,pagoController.modificarPago);


module.exports = protectedRouter;