import RefugiosFactory from '../model/DAO/refugiosFactory.js';
import AnimalesFactory from '../model/DAO/animalesFactory.js';
import {validarRefugioActualizacion} from './validaciones/refugios.js';
import {ErrorRefugioNoModificable, ErrorDeValidacion} from './../utils/ErrorPersonalizado.js';

class Servicio {
    constructor() {
        this.modeloRefugio = RefugiosFactory.get(process.env.MODO_PERSISTENCIA);
        this.modeloAnimales = AnimalesFactory.get(process.env.MODO_PERSISTENCIA); 
        this.validarActualizacion = validarRefugioActualizacion;       
    }

    obtenerRefugios = async (id) => {
        //TODO: Pedir por parametro el limite
       if(id) {
            const refugioEncontrado = await this.modeloRefugio.obtenerRefugio(id);
            return refugioEncontrado;
        }
        else {
            const refugios = await this.modeloRefugio.obtenerRefugios();
            return refugios;
        }
    }
    actualizarRefugio = async (refugioAModificarID, refugio, refugioSolicitanteID) => {
        const esRefugioPropietario = this.#esRefugioPropietario(refugioAModificarID, refugioSolicitanteID);
        if(!esRefugioPropietario) throw new ErrorRefugioNoModificable();
        const esRefugioValido = this.validarActualizacion(refugio);
        if(esRefugioValido.error) throw new ErrorDeValidacion(esRefugioValido.error)
        const refugioActualizado = await this.modeloRefugio.actualizarRefugio(refugioAModificarID, refugio);
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
    #esRefugioPropietario = async (refugioAModificarID, refugioSolicitanteID) => {
        let esPropietario = false;

        const refugioEncontrado = await this.modeloRefugio.obtenerRefugio(refugioAModificarID);
        if(Object.keys(refugioEncontrado).length != 0) {
            const refugioPropietario = refugioEncontrado._id.toString();
            esPropietario = refugioPropietario === refugioSolicitanteID;
        }

        return esPropietario;
    }
}

export default Servicio;


