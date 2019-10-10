'use strict'

const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');


authRouter.post('/register',authController.registrarUsuario);
authRouter.post('/login',authController.loginUsuario);


module.exports = authRouter;