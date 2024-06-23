import ModelFactory from '../model/DAO/refugiosFactory.js';
import { ErrorAutenticacion } from '../utils/errorPersonalizado.js';
import bcrypt from 'bcryptjs';
import generarToken from './../utils/generarToken.js';


class Autenticacion  {
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
        
    }
    async ingresar (email, contrasenia) {
        
        const refugio = await this.modelo.obtenerRefugioPorEmail(email);
        console.log(refugio)
        if(!refugio) throw new ErrorAutenticacion();
        const esContraseniaCorrecta = await bcrypt.compare(contrasenia, refugio.contrasenia);

        if(!esContraseniaCorrecta) throw new ErrorAutenticacion();

        const token = generarToken(refugio.email);
        
        return {token};

    }

    async registrarme (email, contrasenia) {
        
        const refugio = await this.modelo.obtenerRefugioPorEmail(email);
        if(!refugio){

            refugio = {
                email: email,
                contrasenia: contrasenia
            };

            this.modelo.guardarRefugio(refugio)
            
        }
        const token = generarToken(email);
        return { token};
    }
}

export default Autenticacion;