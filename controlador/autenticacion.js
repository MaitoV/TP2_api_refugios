import Servicio from '../servicio/autenticacion.js';
import {ErrorBodyVacio} from '../utils/errorPersonalizado.js';
import esObjetoVacio from './../utils/esObjetoVacio.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    ingresar = async (req, res, next) => {
        try {
            const usuarioRefugio = req.body;
            if(esObjetoVacio(usuarioRefugio)) throw new ErrorBodyVacio();
            const token = await this.servicio.login(usuarioRefugio);
            res.json({ token });
        } catch(error) {
            next(error);
        }
    }
    registrarse = async (req, res, next) => {
        try {
          const refugio = req.body;
          if(esObjetoVacio(refugio)) throw new ErrorBodyVacio();
          const refugioGuardado = await this.servicio.guardarRefugio(refugio);
          res.json(refugioGuardado);
        } catch (error) {
          next(error)
        }
      }

}

export default Controlador;
