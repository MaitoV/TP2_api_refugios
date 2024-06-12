import express from 'express';
import RouterProductos from './router/productos.js'; 
import config from 'config';

const app = express();

//app.use(express.urlencoded({extended:true}));
//app.use(express.json());
//app.use(express.static('public'));

app.use('/api/animalitos', new RouterProductos().start());

const server = app.listen(config.PORT, () => console.log('Servidor ApiRestFul escuchando en el puerto ' + config.PORT));

server.on('error', (error) => console.log('Error en servidor: ' + error.message));

