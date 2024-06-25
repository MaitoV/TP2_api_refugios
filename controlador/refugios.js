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
    actualizarRefugio = async (req, res) => {
        const refugioAModificarID = req.params.id;
        const refugio = req.body;
        const refugioSolicitanteID = req.user.id;
        const refugioActualizado = await this.servicio.actualizarRefugio(refugioAModificarID, refugio, refugioSolicitanteID);
        res.json(refugioActualizado);
    }
    obtenerInforme = async (req, res, error) => {
        try {
            const refugioID = req.user.id;
            const informe = await this.servicio.obtenerInforme(refugioID);
            res.json(informe);
            
        } catch (error) {
            next(error)
        }
    }
}

export default Controlador;
