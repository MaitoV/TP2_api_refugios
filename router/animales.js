import express from 'express';
import AutenticacionMiddleware from './../middlewares/autenticacion.js';
import Controlador from '../controlador/animales.js';

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
        this.autenticacion = AutenticacionMiddleware;
    }
    start() {
        this.router.get('/:id?', this.controlador.obtenerAdoptables);
        this.router.post('/', this.autenticacion, this.controlador.guardarAnimal);
        this.router.put('/:id', this.autenticacion,this.controlador.actualizarAnimal); 
        this.router.delete('/:id', this.autenticacion,this.controlador.eliminarAnimal); 
        return this.router;
    }
}


export default Router;

