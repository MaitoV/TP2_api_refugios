import express from 'express';
import Controlador from '../controlador/refugios.js';

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }
    start() {
        this.router.get('/:id?', this.controlador.obtenerRefugio);
        this.router.post('/', this.controlador.guardarRefugio);
        this.router.put('/:id', this.controlador.actualizarRefugio); 
        return this.router;
    }
}


export default Router;

