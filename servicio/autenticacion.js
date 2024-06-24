import ModelFactory from '../model/DAO/refugiosFactory.js';
import { ErrorAutenticacion, ErrorRefugioInvalido, ErrorEmailEnUso, ErrorCamposAutenticacionVacios} from '../utils/errorPersonalizado.js';
import { encriptarContrasenia } from '../utils/encriptarContrasenia.js';
import validar from './validaciones/refugios.js';
import bcrypt from 'bcryptjs';
import generarToken from './../utils/generarToken.js';

class Autenticacion  {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
    }
    login = async ({email, contrasenia}) => {
        if(!email|| !contrasenia) throw new ErrorCamposAutenticacionVacios();
        const refugio = await this.modelo.obtenerRefugioPorEmail(email);
        if(!refugio) throw new ErrorAutenticacion();
        const esContraseniaCorrecta = await bcrypt.compare(contrasenia, refugio.contrasenia);
        if(!esContraseniaCorrecta) throw new ErrorAutenticacion();
        return generarToken(refugio._id);
    }
    guardarRefugio = async (refugio) => {
        const esRefugioValido = validar(refugio);
        if(esRefugioValido.error) throw new ErrorRefugioInvalido(esRefugioValido.error)
        const emailEnUso = await this.#emailEnUso(refugio.email)
        if(emailEnUso) throw new ErrorEmailEnUso()
        const {contrasenia} = refugio;
        refugio.contrasenia = await encriptarContrasenia(contrasenia);
        const refugioGuardado = await this.modelo.guardarRefugio(refugio);
        return refugioGuardado;
    }
    #emailEnUso = async (email) => {
        let emailEnUso = false;
        const refugio = await this.modelo.obtenerRefugioPorEmail(email);
        if(refugio) emailEnUso = true;
        return emailEnUso;
    }
    
}

export default Autenticacion;