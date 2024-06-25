import ModelFactory from '../model/DAO/animalesFactory.js';
import { ErrorRefugioNoPropietario } from '../utils/errorPersonalizado.js';
import exceljs from 'exceljs';

class Servicio {
    #exceljs;
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
        this.#exceljs = exceljs;
    }

    obtenerAnimal = async (id) => {
        const animalEncontrado = await this.modelo.obtenerAnimal(id);
        return animalEncontrado;
    }

    obtenerAnimalesPorRefugio = async (refugioID) => {
        console.log(refugioID)
        const animalesEncontrados = await this.modelo.obtenerAnimalesPorRefugio(refugioID);
        return animalesEncontrados;
    }

    obtenerAdoptables = async () => {
        const animalesDisponibles = await this.modelo.obtenerAdoptables();
        return animalesDisponibles
    }
    
    guardarAnimal = async (animal) => {
        const animalGuardado = await this.modelo.guardarAnimal(animal);
        return animalGuardado;
    }
    guardarAnimalitos = async (archivo, refugioID) => {
        const arrayAnimalitos = await this.#leerArchivoExcel(archivo.buffer);
        const animalitosGuardados = []

        for(let animal of arrayAnimalitos){
            animal.refugioID = refugioID;
            const animalGuardado = await this.modelo.guardarAnimal(animal);
            animalitosGuardados.push(animalGuardado);
        }

        return animalitosGuardados;
    }
    
    actualizarAnimal = async (animalID, animal, refugioID) => {
        const esRefugioPropietario = await this.#esRefugioPropietario(refugioID, animalID);
        if(!esRefugioPropietario) {
            throw new ErrorRefugioNoPropietario();
        }
        const animalActualizado = await this.modelo.actualizarAnimal(animalID, animal);
        return animalActualizado;
    }
    eliminarAnimal = async (animalID, refugioID) => {
        const esRefugioPropietario = await this.#esRefugioPropietario(refugioID, animalID);
        if(!esRefugioPropietario) {
            throw new ErrorRefugioNoPropietario();
        }
        const animalEliminado = await this.modelo.eliminarAnimal(animalID);
        return animalEliminado;
    }
    #esRefugioPropietario = async (refugioID, animalID) => {
        let esPropietario = false;

        const animalEncontrado = await this.modelo.obtenerAnimal(animalID);
        const refugioPropietario = animalEncontrado.refugioID.toString();
        esPropietario = refugioPropietario === refugioID;

        return esPropietario;
    }
    #leerArchivoExcel = async(buffer) => {
        const archivoExcel = new this.#exceljs.Workbook();
        await archivoExcel.xlsx.load(buffer);
        const hoja = archivoExcel.worksheets[0];
        const data = [];

        hoja.eachRow({ includeEmpty: false }, (fila, rowNumber) => {
            const dataFila = {
                nombre: fila.getCell(0).value,
                clase: fila.getCell(1).value,
                edad: fila.getCell(2).value,
                raza: fila.getCell(3).value,
                estado: fila.getCell(4).value,
            };
            data.push(dataFila);
        });

        return data;
    }
}

export default Servicio;
