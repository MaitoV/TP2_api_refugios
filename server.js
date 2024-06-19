import express from 'express';
import conexionMongoDB from './model/dbMongo.js';
import { errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
import IndexRouter from './router/index.js';

dotenv.config();

const app = express();

//app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(express.static('public'));

app.use('/api', new IndexRouter().start());

app.use(errorHandler)

if(process.env.MODO_PERSISTENCIA === 'MONGODB') {
    await conexionMongoDB.conectar();
}

const server = app.listen(process.env.PORT, () => console.log('Servidor ApiRestFul escuchando en el puerto ' + process.env.PORT));

server.on('error', (error) => console.log('Error en servidor: ' + error.message));

