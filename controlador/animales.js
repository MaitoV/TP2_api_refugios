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
            const {nombre, edad, tipo, estado} = req.body;
            if(nombre === '' || edad === '' || tipo === '' || estado == '') throw new ErrorAnimalInvalido();
            req.body.refugioID = refugioID;
            const animalGuardado = await this.servicio.guardarAnimal(req.body);
            res.json(animalGuardado);

        } catch (error) {
            next(error);
        }
    }
    actualizarAnimal = async (req, res) => {
        const {id} = req.params;
        const animal = req.body;
        const animalActualizado = await this.servicio.actualizarAnimal(id, animal);
        res.json(animalActualizado);
    }
    eliminarAnimal = async (req, res) => {
        const {id} = req.params;
        const refugio = req.body;
        const refugioActualizado = await this.servicio.actualizarRefugio(id, refugio);
        res.json(refugioActualizado);
    }

}

export default Controlador;
