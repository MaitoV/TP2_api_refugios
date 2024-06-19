import ModelFactory from '../model/DAO/animalesFactory.js';

class Servicio {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
    }

    /*obtenerRefugios = async (id) => {
       if(id) {
            const refugioEncontrado = await this.modelo.obtenerRefugio(id);
            return refugioEncontrado;
        }
        else {
            const refugios = await this.modelo.obtenerRefugios();
            return refugios;
        }
    }*/
    
    guardarAnimal = async (animal) => {
        const animalGuardado = await this.modelo.guardarAnimal(animal);
        return animalGuardado;
    }
    
    /*actualizarRefugio = async (id, refugio) => {
        const refugioActualizado = await this.modelo.actualizarRefugio(id, refugio);
        return refugioActualizado;
    }*/
}

export default Servicio;
