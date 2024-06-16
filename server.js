import express from 'express';
import RouterRefugios from './router/refugios.js'; 
import RouterAutenticacion from './router/autenticacion.js'; 
import config from './config.js';
import conexionMongoDB from './model/dbMongo.js';
import { errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(express.static('public'));

app.use('/api/refugios', new RouterRefugios().start());
app.use('/api/autenticacion', new RouterAutenticacion().start());

app.use(errorHandler)

if(config.MODO_PERSISTENCIA === 'MONGODB') {
    await conexionMongoDB.conectar();
}

const server = app.listen(config.PORT, () => console.log('Servidor ApiRestFul escuchando en el puerto ' + config.PORT));

server.on('error', (error) => console.log('Error en servidor: ' + error.message));

