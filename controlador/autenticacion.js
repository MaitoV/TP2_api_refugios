import Servicio from '../servicio/autenticacion.js';
import { ErrorAutenticacionCamposVacios } from '../utils/errorPersonalizado.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    ingresar = async (req, res, next) => {
        try {
            const usuarioRefugio = req.body;
            if(!usuarioRefugio) {
                throw new ErrorAutenticacionCamposVacios();
            }

            const token = await this.servicio.login(email, contrasenia);
            res.json({ token });
        } catch(error) {
            next(error);
        }
    }
    registrarse = async (req, res, next) => {
        try {
          const refugio = req.body;
          const refugioGuardado = await this.servicio.guardarRefugio(refugio);
          res.json(refugioGuardado);
        } catch (error) {
          next(error)
        }
      }

}

export default Controlador;
