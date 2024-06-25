import ModelFactory from '../model/DAO/animalesFactory.js';
import { ErrorRefugioNoPropietario, ErrorDeValidacion } from '../utils/errorPersonalizado.js';
import exceljs from 'exceljs';
import {validarAnimal, validarActualizacionAnimal} from './validaciones/animales.js';

class Servicio {
    #exceljs;
    constructor() {
        this.modelo = ModelFactory.get(process.env.MODO_PERSISTENCIA);
        this.#exceljs = exceljs;
        this.validar = validarAnimal;
        this.validarActualizacion = validarActualizacionAnimal;
    }

    obtenerAnimal = async (id) => {
        const animalEncontrado = await this.modelo.obtenerAnimal(id);
        return animalEncontrado;
    }

    obtenerAdoptables = async () => {
        const animalesDisponibles = await this.modelo.obtenerAdoptables();
        return animalesDisponibles
    }
    
    guardarAnimal = async (animal, refugioID) => {
        const esAnimalValido = this.validar(animal);
        if(esAnimalValido.error) throw new ErrorDeValidacion(esAnimalValido.error)
        animal.refugioID = refugioID;
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
        if(!esRefugioPropietario) throw new ErrorRefugioNoPropietario();
        const esAnimalValido = this.validarActualizacion(animal);
        if(esAnimalValido.error) throw new ErrorDeValidacion(esAnimalValido.error)
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
        if(Object.keys(animalEncontrado).length != 0) {
            const refugioPropietario = animalEncontrado.refugioID.toString();
            esPropietario = refugioPropietario === refugioID;
        }

        return esPropietario;
    }
    #leerArchivoExcel = async(buffer) => {
        const archivoExcel = new this.#exceljs.Workbook();
        await archivoExcel.xlsx.load(buffer);
        const hoja = archivoExcel.worksheets[0];
        let data = [];

        hoja.eachRow({ includeEmpty: false }, (fila, rowNumber) => {
            const dataFila = {
                nombre: fila.getCell(1).value,
                edad: fila.getCell(2).value,
                estado: fila.getCell(3).value,
                tipo: fila.getCell(4).value,
                descripcion: fila.getCell(5).value,
            };
            data.push(dataFila);
        });

        data = await this.#eliminarCabeceraDelExcel(data);
        
        return data;
    }
    #eliminarCabeceraDelExcel = async (data) => {
        let dataSinCabecera = data;
        const nombreColumnasBaseDeDatos = await this.modelo.obtenerNombreDeColumnas();
        const cabeceraArchivo = Object.values(data[0]);
        const tieneCabecera = nombreColumnasBaseDeDatos.filter(atributo => cabeceraArchivo.includes(atributo));
        if(tieneCabecera.length > 2) dataSinCabecera = data.slice(1)

        return dataSinCabecera;
    }
}

export default Servicio;
