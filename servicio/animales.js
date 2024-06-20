import ModelFactory from '../model/DAO/animalesFactory.js';
import { ErrorRefugioNoPropietario } from '../utils/errorPersonalizado.js';

class Servicio {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
    }

    obtenerAnimal = async (id) => {
        const animalEncontrado = await this.modelo.obtenerAnimal(id);
        return animalEncontrado;
    }

    obtenerAdoptables = async () => {
        const animalesDisponibles = await this.modelo.obtenerAdoptables();
        return animalesDisponibles
    }
    
    guardarAnimal = async (animal) => {
        const animalGuardado = await this.modelo.guardarAnimal(animal);
        return animalGuardado;
    }
    
    actualizarAnimal = async (animalID, animal, refugioID) => {
        const esRefugioPropietario = await this.#esRefugioPropietario(refugioID, animalID);
        if(!esRefugioPropietario) {
            throw new ErrorRefugioNoPropietario();
        }
        const animalActualizado = await this.modelo.actualizarAnimal(animalID, animal);
        return animalActualizado;
    }
    eliminarAnimal = async (animalID, refugioID) => {
        const esRefugioPropietario = await this.#esRefugioPropietario(refugioID, animalID);
        if(!esRefugioPropietario) {
            throw new ErrorRefugioNoPropietario();
        }
        const animalEliminado = await this.modelo.eliminarAnimal(animalID);
        return animalEliminado;
    }
    #esRefugioPropietario = async (refugioID, animalID) => {
        let esPropietario = false;

        const animalEncontrado = await this.modelo.obtenerAnimal(animalID);
        const refugioPropietario = animalEncontrado.refugioID.toString();
        esPropietario = refugioPropietario === refugioID;

        return esPropietario;
    }
}

export default Servicio;
