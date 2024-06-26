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
        const refugios = await conexionMongoDB.db.collection('refugios').find({}, { projection: { contrasenia: 0 }}).toArray();
        return refugios;
    }
    obtenerRefugio = async (id) => {
        if(!conexionMongoDB.conexionOk) return {}
        const refugio = await conexionMongoDB.db.collection('refugios').findOne({_id: new ObjectId(id)}, { projection: { contrasenia: 0 } });
        return refugio || {};
    }
    guardarRefugio = async (refugio) => {
        if(!conexionMongoDB.conexionOk) return {}
        const refugioID = await conexionMongoDB.db.collection('refugios').insertOne(refugio);
        const refugioGuardado = await this.obtenerRefugio(refugioID.insertedID);
        return refugioGuardado;
    }
    actualizarRefugio = async (id, refugio) => {
        if(!conexionMongoDB.conexionOk) return {}
        await conexionMongoDB.db.collection('refugios').updateOne({_id: new ObjectId(id)},{ $set: refugio })
        const refugioActualizado = await this.obtenerRefugio(id)
        return refugioActualizado;
    }
}

export default ModelMongoDB;

