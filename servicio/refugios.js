import ModelFactory from '../model/DAO/refugiosFactory.js';
import { encriptarContrasenia } from '../utils/encriptarContrasenia.js';

class Servicio {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
    }

    obtenerRefugio = async (email) => {
       if(email) {
        
        const refugioEncontrado = await this.modelo.obtenerRefugioPorEmail(email);
        return refugioEncontrado;
        }
        else {
            const refugios = await this.modelo.obtenerRefugio();
            return refugios;
        }
    }
    
    guardarRefugio = async (refugio) => {
        const {contrasenia} = refugio;
        refugio.contrasenia = await encriptarContrasenia(contrasenia);
        const refugioGuardado = await this.modelo.guardarRefugio(refugio);
        return refugioGuardado;
    }
    
    actualizarRefugio = async (id, refugio) => {
        const refugioActualizado = await this.modelo.actualizarRefugio(id, refugio);
        return refugioActualizado;
    }
}

export default Servicio;


