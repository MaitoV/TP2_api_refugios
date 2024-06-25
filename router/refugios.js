import express from 'express';
import Controlador from '../controlador/refugios.js';
import AutenticacionMiddleware from './../middlewares/autenticacion.js'

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
        this.autenticacion = AutenticacionMiddleware;
    }
    start() {
        this.router.get('/informe', this.autenticacion, this.controlador.obtenerInforme);
        this.router.get('/:id?', this.controlador.obtenerRefugios);
        this.router.put('/:id', this.autenticacion, this.controlador.actualizarRefugio); 
        return this.router;
    }
}


export default Router;

