import Servicio from '../servicio/refugios.js';

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }
    obtenerAdoptables = async (req, res) => {
        const {id} = req.params;
        const adoptables = await this.servicio.obtenerRefugios(id);
        res.json(adoptables);
    }
    
    guardarAnimal = async (req, res) => {
        const animal = req.body;
        const animalGuardado = await this.servicio.guardarRefugio(refugio);
        res.json(animalGuardado);
    }
    actualizarAnimal = async (req, res) => {
        const {id} = req.params;
        const refugio = req.body;
        const refugioActualizado = await this.servicio.actualizarRefugio(id, refugio);
        res.json(refugioActualizado);
    }
    eliminarAnimal = async (req, res) => {
        const {id} = req.params;
        const refugio = req.body;
        const refugioActualizado = await this.servicio.actualizarRefugio(id, refugio);
        res.json(refugioActualizado);
    }

}

export default Controlador;
