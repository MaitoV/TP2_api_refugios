import Servicio from '../servicio/refugios.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    
    obtenerRefugio = async (req, res) => {
        try {
          // Obtener el token de la cabecera de autorización
          const token = req.headers.authorization.split(' ')[1];
    
          // Verificar y decodificar el token para obtener el email del refugio
          const decoded = jwt.verify(token, config.JWT_SECRET);
          const id = decoded.id;
          // Si hay un ID en los parámetros, obtener un solo refugio por ID
          
          if (id) {
            const refugio = await this.servicio.obtenerRefugio(id);
            if (!refugio) {
              throw new Error('Refugio no encontrado');
            }
            
            res.json(refugio);
          }
        } catch (error) {
          console.error('Error al obtener los refugios:', error);
          res.status(500).json({ message: 'Error al obtener los refugios', error });
        }
      }

    guardarRefugio = async (req, res) => {

        const refugio = req.body;
        const refugioGuardado = await this.servicio.guardarRefugio(refugio);
        res.json(refugioGuardado);
    }
    actualizarRefugio = async (req, res) => {
        const {id} = req.params;
        const refugio = req.body;
        const refugioActualizado = await this.servicio.actualizarRefugio(id, refugio);
        res.json(refugioActualizado);
    }

}

export default Controlador;
