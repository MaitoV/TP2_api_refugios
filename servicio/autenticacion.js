import ModelFactory from '../model/DAO/refugiosFactory.js';
import { ErrorAutenticacion } from '../utils/errorPersonalizado.js';
import bcrypt from 'bcryptjs';
import generarToken from './../utils/generarToken.js';

class Autenticacion  {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
    }
    async login (email, contrasenia) {
        const refugio = await this.modelo.obtenerRefugioPorEmail(email);
        if(!refugio) throw new ErrorAutenticacion();
        const esContraseniaCorrecta = await bcrypt.compare(contrasenia, refugio.contrasenia);

        if(!esContraseniaCorrecta) throw new ErrorAutenticacion();

        return generarToken(refugio._id);
    }
}

export default Autenticacion;