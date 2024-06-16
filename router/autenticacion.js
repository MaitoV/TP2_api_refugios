import express from 'express';
import Controlador from '../controlador/autenticacion.js';

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }
    start() {
        this.router.post('/ingresar', this.controlador.ingresar);
        return this.router;
    }
}


export default Router;

