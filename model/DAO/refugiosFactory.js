import ModelMem from "./refugiosMem.js";

class ModelFactory {
    static get(tipo) {
        switch(tipo) {
            case 'MEM':
                return new ModelMem();
            break;
            default: 
                return new ModelMem();
        }
    }
}

export default ModelFactory;