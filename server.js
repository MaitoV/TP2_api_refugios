import express from 'express';
import indexRouter from './router/index.js';
import conexionMongoDB from './model/dbMongo.js';
import { errorHandler } from './middlewares/errorHandler.js';

class Server {
    constructor(port, persistencia, notificacion) {
        this.port = port;
        this.persistencia = persistencia;
        this.notificacion = notificacion;

        this.app = express()
        this.server = null;
    }
    async start() {
        //this.app.use(express.urlencoded({extended:true}));
        //this.app.use(express.static('public'));
        this.app.use(express.json());

        this.app.use('/api', new indexRouter().start());
        this.app.use(errorHandler);

        if(this.persistencia === 'MONGODB') {
            await conexionMongoDB.conectar();
        }
        /*if(this.notificacion === 'WHATSAPP') {
            new NotificacionesWhatsapp();
        }*/

        const PORT = this.port;
        this.server = this.app.listen(PORT, () => console.log(`Servidor ApiRestFul escuchando en el puerto ${PORT}`));
        this.server.on('error', error => console.log(`Error en servidor: ${error.message}`));

        return this.app;
    }
    async stop() {
        if(this.server) {
            this.server.close()
            await conexionMongoDB.desconectar()
            this.server = null
        }
    }
}

export default Server;


