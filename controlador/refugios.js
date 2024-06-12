import Servicio from '../servicio/refugios.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    obtenerRefugios = async (req, res) => {
        const {id} = req.params;
        const refugios = await this.servicio.obtenerRefugios(id);
        res.json(refugios);
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
