import RefugiosFactory from '../model/DAO/refugiosFactory.js';
import AnimalesFactory from '../model/DAO/animalesFactory.js';
import { encriptarContrasenia } from '../utils/encriptarContrasenia.js';
import NotificacionesWhatsapp from '../utils/NotificacionesWhatsapp.js';
import validar from './validaciones/refugios.js';
import { ErrorRefugioInvalido } from '../utils/errorPersonalizado.js';

class Servicio {
    constructor() {
        this.modeloRefugio = RefugiosFactory.get(process.env.MODO_PERSISTENCIA);
        this.modeloAnimales = AnimalesFactory.get(process.env.MODO_PERSISTENCIA);
        this.notificar = new NotificacionesWhatsapp();
        
    }

    obtenerRefugios = async (id) => {
       if(id) {
            const refugioEncontrado = await this.modeloRefugio.obtenerRefugio(id);
            return refugioEncontrado;
        }
        else {
            const refugios = await this.modeloRefugio.obtenerRefugios();
            return refugios;
        }
    }
    
    guardarRefugio = async (refugio) => {
        const esRefugioValido = validar(refugio);
        if(!esRefugioValido.result) throw new ErrorRefugioInvalido(esRefugioValido.error)
        const {contrasenia} = refugio;
        refugio.contrasenia = await encriptarContrasenia(contrasenia);
        const refugioGuardado = await this.modeloRefugio.guardarRefugio(refugio);
        return refugioGuardado;
    }
    
    actualizarRefugio = async (id, refugio) => {
        const refugioActualizado = await this.modeloRefugio.actualizarRefugio(id, refugio);
        return refugioActualizado;
    }
    obtenerInforme = async (refugioID) => {
        const animales = await this.modeloAnimales.obtenerAnimalesPorRefugio(refugioID);
        const estadisticas = this.#procesarEstadisticas(animales);
        const mensaje = this.#formatearMensajeEstadisticas(estadisticas);
        await this.notificar.enviarMensaje();
        return mensaje;
        
    }
    #procesarEstadisticas = (animales) => {
        const estadisticas = {totales: {} };
        for(let animal of animales) {
            const tipo = animal.tipo;
            const estado = animal.estado;

            estadisticas.totales[estado] ??= 0;
            estadisticas.totales[estado] += 1;
            estadisticas[tipo] ??= {};
            estadisticas[tipo][estado] ??= 0;
            estadisticas[tipo][estado] ++;
        }
        return estadisticas;
    }
    #formatearMensajeEstadisticas = (estadisticas) => {
        let mensaje = `******** Informe ${new Date().toString()} ********** \n `;
        Object.entries(estadisticas).forEach(([animal, estados]) => {
            mensaje += `${animal}: \n `;
            Object.entries(estados).forEach(([estado, cantidad]) => {
              mensaje += `  ${estado}: ${cantidad}\n `;
            });
        });
        return mensaje;

    }
}

export default Servicio;


