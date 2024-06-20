
import {MongoClient} from 'mongodb';
import config from './../config.js';

class conexionMongoDB {
    static client = null;
    static db = null;
    static conexionOk = false;

    static conectar = async () => {
        try {
            conexionMongoDB.client =  new MongoClient(config.MONGO_STRING_CONEXION);
            await conexionMongoDB.client.connect();
            console.log('Base de datos MongoDB conectada');
    
            conexionMongoDB.db = conexionMongoDB.client.db(config.MONGO_BASE);
            conexionMongoDB.conexionOk = true;
        } catch (error) {
            console.log(`Error en la conexion a MongoDB: ${error.message} `);
        }
    }
    static desconectar = async () => {
        if(!conexionMongoDB.conexionOk) return
        await conexionMongoDB.client.close()
        conexionMongoDB.conexionOk = false
    }
}

export default conexionMongoDB;