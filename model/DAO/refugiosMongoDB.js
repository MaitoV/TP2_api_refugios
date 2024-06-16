import { ObjectId } from "mongodb";
import conexionMongoDB from "../dbMongo.js"
class ModelMongoDB {
    constructor() {}
    obtenerRefugioPorEmail = async (email) => {
        if(!conexionMongoDB.conexionOk) return {}
        const refugio = await conexionMongoDB.db.collection('refugios').findOne({email: email});
        return refugio;
    }
    obtenerRefugios = async () => {
        if(!conexionMongoDB.conexionOk) return []
        const refugios = await conexionMongoDB.db.collection('refugios').find({}).toArray();
        return refugios;
    }
    obtenerRefugio = async (id) => {
        if(!conexionMongoDB.conexionOk) return {}
        const refugio = await conexionMongoDB.db.collection('refugios').findOne({_id: new ObjectId(id)});
        return refugio;
    }
    guardarRefugio = async (refugio) => {
        if(!conexionMongoDB.conexionOk) return {}
        const refugioConID = await conexionMongoDB.db.collection('refugios').insertOne(refugio);
        return refugioConID;
    }
    actualizarRefugio = async (id, refugio) => {
        if(!conexionMongoDB.conexionOk) return {}
    }
}

export default ModelMongoDB;

