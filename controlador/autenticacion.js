import Servicio from '../servicio/autenticacion.js';
import { ErrorAutenticacionCamposVacios } from '../utils/errorPersonalizado.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
   ingresar = async (req, res, next) => {
        try {
            const { email, contrasenia } = req.body;
            if (!email || !contrasenia) {
                throw new ErrorAutenticacionCamposVacios();
            }
            
            const { token } = await this.servicio.ingresar(email, contrasenia);
            res.json({ token});
        } catch (error) {
            next(error);
        }
    }

    registrarme = async (req, res, next) => {
        try {
            const { email, contrasenia } = req.body;
            if (!email || !contrasenia) {
                throw new ErrorAutenticacionCamposVacios();
            }
            
            const { token } = await this.servicio.registrarme(email, contrasenia);
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }

}

export default Controlador;
