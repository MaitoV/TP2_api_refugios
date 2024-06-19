import Servicio from '../servicio/animales.js';
import { ErrorAnimalInvalido } from '../utils/errorPersonalizado.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    obtenerAdoptables = async (req, res) => {
        const {id} = req.params;
        const adoptables = await this.servicio.obtenerRefugios(id);
        res.json(adoptables);
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
        const refugio = req.body;
        const refugioActualizado = await this.servicio.actualizarRefugio(id, refugio);
        res.json(refugioActualizado);
    }
    eliminarAnimal = async (req, res) => {
        const {id} = req.params;
        const refugio = req.body;
        const refugioActualizado = await this.servicio.actualizarRefugio(id, refugio);
        res.json(refugioActualizado);
    }

}

export default Controlador;
