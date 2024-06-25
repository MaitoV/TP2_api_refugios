import { ObjectId } from "mongodb";
import conexionMongoDB from "../dbMongo.js"

class ModelMongoDB {
    obtenerAnimal = async (id) => {
        if(!conexionMongoDB.conexionOk) return {}
        const animal = await conexionMongoDB.db.collection('animales').findOne({_id: new ObjectId(id)});
        return animal || {};
    }
    obtenerAdoptables = async () => {
        const disponibles = await conexionMongoDB.db.collection('animales').find({ estado: 'disponible' }).toArray();
        return disponibles;
    }
    obtenerAnimalesPorRefugio = async (refugioID) => {
        if(!conexionMongoDB.conexionOk) return []
        const animales = await  await conexionMongoDB.db.collection('animales').find({ 
            refugioID: new ObjectId(refugioID)
        }).toArray();
        return animales;
    }
    obtenerAdoptadosPorRefugio = async (refugioID) => {
        if(!conexionMongoDB.conexionOk) return []
        const adoptados = await  await conexionMongoDB.db.collection('animales').find({ 
            estado: 'adoptado',
            refugioID: refugioID 
        }).toArray();
        return adoptados;
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
        const animal = this.obtenerAnimal(id);
        const animalEliminado = await conexionMongoDB.db.collection('animales').deleteOne({ _id: new ObjectId(id) });
        return animal;
    }
    obtenerNombreDeColumnas = async() => {
        const objeto = await conexionMongoDB.db.collection('animales').findOne();
        const columnas = Object.keys(objeto) || ['nombre', 'edad', 'descripcion'];
        return columnas;
    }
}

export default ModelMongoDB;

