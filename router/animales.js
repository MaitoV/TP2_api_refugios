import express from 'express';
import AutenticacionMiddleware from './../middlewares/autenticacion.js';
import Controlador from '../controlador/animales.js';
import cargarUnArchivoExcel from '../middlewares/cargaArchivos.js';

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
        this.autenticacion = AutenticacionMiddleware;
        this.cargarArchivo = cargarUnArchivoExcel;
    }
    start() {
        this.router.get('/adoptables', this.controlador.obtenerAdoptables);
        this.router.get('/:id', this.controlador.obtenerAnimal);
        this.router.get('/', this.controlador.obtenerAnimalesPorRefugio);
        this.router.post('/', this.autenticacion, this.controlador.guardarAnimal);
        this.router.post('/carga/archivo', this.autenticacion, this.cargarArchivo, this.controlador.guardarAnimalitos);
        this.router.put('/:id', this.autenticacion,this.controlador.actualizarAnimal); 
        this.router.delete('/:id', this.autenticacion,this.controlador.eliminarAnimal); 
        return this.router;
    }
}


export default Router;

