import { ObjectId } from "mongodb";
import conexionMongoDB from "../dbMongo.js"

class ModelMongoDB {
    constructor() {}
    /*obtenerRefugioPorEmail = async (email) => {
        if(!conexionMongoDB.conexionOk) return {}
        const refugio = await conexionMongoDB.db.collection('refugios').findOne({email: email});
        return refugio;
    }
    obtenerRefugios = async () => {
        if(!conexionMongoDB.conexionOk) return []
        const refugios = await conexionMongoDB.db.collection('refugios').find({}).toArray();
        return refugios;
    }
    }*/
    obtenerAnimal = async (id) => {
        if(!conexionMongoDB.conexionOk) return {}
        const animal = await conexionMongoDB.db.collection('animales').findOne({_id: new ObjectId(id)});
        return animal || {};
    }

    obtenerAnimalesPorRefugio = async (refugioID) => {
        if(!conexionMongoDB.conexionOk) return {}
        const animales = await conexionMongoDB.db.collection('animales').find({refugioID: new ObjectId(refugioID)}).toArray();
       
        return animales;
    }

    obtenerAdoptables = async () => {
        const disponibles = await conexionMongoDB.db.collection('animales').find({ estado: 'en_adopcion' }).toArray();
        return disponibles;
    }
    guardarAnimal = async (animal) => {
        if(!conexionMongoDB.conexionOk) return {}
        animal.refugioID = new ObjectId(animal.refugioID);
        const animalGuardadoID = await conexionMongoDB.db.collection('animales').insertOne(animal);
        const animalConID = this.obtenerAnimal(animalGuardadoID.insertedId.toString());
        return animalConID;
    }
    actualizarAnimal = async (id, animal) => {
        if(!conexionMongoDB.conexionOk) return {}

        await conexionMongoDB.db.collection('animales').updateOne({_id: new ObjectId(id)},{ $set: animal });
        const animalActualizado = await this.obtenerAnimal(id);
        return animalActualizado;
    }
    eliminarAnimal = async (id) => {
        if(!conexionMongoDB.conexionOk) return {}

        const animalEliminado = await conexionMongoDB.db.collection('animales').deleteOne({ _id: new ObjectId(id) });
        return animalEliminado;
    }
}

export default ModelMongoDB;

