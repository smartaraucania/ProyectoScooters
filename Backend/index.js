'use strict'

const mongoose = require('mongoose'); 
const app = require('./app');
const config = require('./config');

const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/auth',authRoutes);
app.use('/public',publicRoutes);
app.use('/protected',protectedRoutes);

app.get('/',(req,res)=>{
    res.send({message:'Api Rest'})
})

mongoose.connect(config.db,{ useNewUrlParser: true },(err,res)=>{
    if(err){
        return console.log(`Error al conectar a base de datos: ${err}`);
    }
    console.log('conexion a base de datos establecida');
    //Start backend
    app.listen(config.port, () => {
        console.log(`API REST conrriendo en http://localhost:${config.port}`)
    });
})