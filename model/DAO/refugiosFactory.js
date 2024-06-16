import ModelMongoDB from "./refugiosMongoDB.js";

class ModelFactory {
    static get(tipo) {
        switch(tipo) {
            case 'MONGODB':
                return new ModelMongoDB();
            break;
            default: 
                return new ModelMongoDB();
        }
    }
}

export default ModelFactory;