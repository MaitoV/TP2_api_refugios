import Servicio from '../servicio/animales.js';
import { ErrorAnimalInvalido } from '../utils/errorPersonalizado.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    obtenerAnimal = async (req, res) => {
        const {id} = req.params;
        const animal = await this.servicio.obtenerAnimal(id);
        res.json(animal);
    }
    obtenerAdoptables = async (req, res) => {
        const animalesDisponibles = await this.servicio.obtenerAdoptables();
        res.json(animalesDisponibles);
    }
    guardarAnimal = async (req, res, next) => {
        try {
            const refugioID = req.user.id;
            const animal = req.body;
            if(animal === '') throw new ErrorAnimalInvalido();
            req.body.refugioID = refugioID;
            const animalGuardado = await this.servicio.guardarAnimal(req.body);
            res.json(animalGuardado);

        } catch (error) {
            next(error);
        }
    }
    actualizarAnimal = async (req, res, next) => {
        try {
            const {id} = req.params;
            const animal = req.body;
            const refugioID = req.user.id;
            const animalActualizado = await this.servicio.actualizarAnimal(id, animal, refugioID);
            res.json(animalActualizado);
        } catch(error) {
            next(error);
        }
    }
    eliminarAnimal = async (req, res, next) => {
        try {
            const {id} = req.params;
            const refugioID = req.user.id;
            const animalEliminado = await this.servicio.eliminarAnimal(id, refugioID);
            res.json(animalEliminado);

        } catch (error) {
            next(error)
        }
    }

}

export default Controlador;
