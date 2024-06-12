import ModelFactory from '../model/DAO/refugiosFactory.js';
import config from './../config.js';

class Servicio {
    constructor() {
        this.modelo = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

    obtenerRefugios = async (id) => {
       if(id) {
            const refugioEncontrado = await this.modelo.obtenerRefugio(id);
            return refugioEncontrado;
        }
        else {
            const refugios = await this.modelo.obtenerRefugios();
            return refugios;
        }
    }
    
    guardarRefugio = async (refugio) => {
        const refugioGuardado = await this.modelo.guardarRefugio(refugio);
        return refugioGuardado;
    }
    
    actualizarRefugio = async (id, refugio) => {
        const refugioActualizado = await this.modelo.actualizarRefugio(id, refugio);
        return refugioActualizado;
    }
}

export default Servicio;


