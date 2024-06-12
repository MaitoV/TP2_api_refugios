import express from 'express';
import RouterProductos from './router/refugios.js'; 
import config from './config.js';

const app = express();

//app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(express.static('public'));

app.use('/api/refugios', new RouterProductos().start());

const server = app.listen(config.PORT, () => console.log('Servidor ApiRestFul escuchando en el puerto ' + config.PORT));

server.on('error', (error) => console.log('Error en servidor: ' + error.message));

