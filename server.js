import express from 'express';
import RouterProductos from './router/refugios.js'; 
import config from './config.js';
import conexionMongoDB from './model/dbMongo.js';

const app = express();

//app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(express.static('public'));

app.use('/api/refugios', new RouterProductos().start());

if(config.MODO_PERSISTENCIA === 'MONGODB') {
    await conexionMongoDB.conectar();
}

const server = app.listen(config.PORT, () => console.log('Servidor ApiRestFul escuchando en el puerto ' + config.PORT));

server.on('error', (error) => console.log('Error en servidor: ' + error.message));

