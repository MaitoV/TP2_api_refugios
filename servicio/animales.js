import ModelFactory from '../model/DAO/animalesFactory.js';

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
    
    /*actualizarAnimal = async (id, animal) => {
        const animalActualizado = await this.modelo.actualizarAnimal(id, animal);
        return animalActualizado;
    }*/
}

export default Servicio;
