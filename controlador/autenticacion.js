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
            
            const { token } = await this.servicio.ingresar(email,contrasenia);
            res.status(200).json({ token });
            res.json({ redirectTo: '/dashboard' });
            
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

    cerrarSesion = async (req, res, next) => {
        try {
            req.session.destroy(err => {
                if (err) {
                  return res.status(500).send('No se pudo cerrar la sesión.');
                }
                console.log("pasa por aca")
                res.clearCookie('token'); 
                res.send('Sesión cerrada.');
              });
        } catch (error) {
            next(error);
        }
    }




}

export default Controlador;
