import ModelFactory from '../model/DAO/refugiosFactory.js';
import { ErrorAutenticacion, ErrorRefugioInvalido } from '../utils/errorPersonalizado.js';
import { encriptarContrasenia } from '../utils/encriptarContrasenia.js';
import validar from './validaciones/refugios.js';
import bcrypt from 'bcryptjs';
import generarToken from './../utils/generarToken.js';

class Autenticacion  {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
    }
    login = async (email, contrasenia) => {
        //TODO: VALIDAR QUE SI EL MAIL NO ESTA TIRE UN ERROR DE REGISTRO
        const refugio = await this.modelo.obtenerRefugioPorEmail(email);
        if(!refugio) throw new ErrorAutenticacion();
        const esContraseniaCorrecta = await bcrypt.compare(contrasenia, refugio.contrasenia);

        if(!esContraseniaCorrecta) throw new ErrorAutenticacion();

        return generarToken(refugio._id);
    }
    guardarRefugio = async (refugio) => {
        const esRefugioValido = validar(refugio);
        if(!esRefugioValido.result) throw new ErrorRefugioInvalido(esRefugioValido.error)
        const {contrasenia} = refugio;
        refugio.contrasenia = await encriptarContrasenia(contrasenia);
        const refugioGuardado = await this.modelo.guardarRefugio(refugio);
        return refugioGuardado;
    }
    
}

export default Autenticacion;