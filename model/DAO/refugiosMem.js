class ModelMem {
    #refugios;
    constructor() {
        this.#refugios = [
            {id: '1', nombre: 'Patitas al rescate', email: 'patitas32@gmail.com', telefono: '5491125678990'},
            {id: '2', nombre: 'la michicueva', email: 'michicueva@gmail.com', telefono: '549295034568910'},
            {id: '3', nombre: 'Zaguates Refugio', email: 'zaguates2024@gmail.com', telefono: '549022310908769'}
        ]        
    }
    obtenerRefugios = async () => {
        return this.#refugios;
    }
    obtenerRefugio = async (id) => {
        const refugioEncontrado = this.#refugios.find(refugio => refugio.id === id);
        return refugioEncontrado || {}; 
    }
    guardarRefugio = async (refugio) => {
        const id = String(parseInt(this.#refugios[this.#refugios.length - 1]?.id || 0) + 1);
        const refugioConID = {id: id, ...refugio} 
        this.#refugios.push(refugioConID);
        return refugioConID;
    }
    actualizarRefugio = async (id, refugio) => {
        const index = this.#refugios.findIndex(refugio => refugio.id === id);
        if(index != -1) {
            const refugioAnterior = this.#refugios[index];
            const refugioActualizado = {...refugioAnterior, ...refugio};
            this.#refugios.splice(index, 1, refugioActualizado);
            return refugioActualizado;
        } else {
            return {}
        }
    }
}

export default ModelMem;

