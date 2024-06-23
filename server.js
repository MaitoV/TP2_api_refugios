import express from 'express';
import indexRouter from './router/index.js';
import conexionMongoDB from './model/dbMongo.js';
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import autenticacionMiddleware from './middlewares/autenticacion.js';


class Server {
    constructor(port, persistencia) {
        this.port = port;
        this.persistencia = persistencia;

        this.app = express()
        this.server = null;
    }
    async start() {
        //this.app.use(express.urlencoded({extended:true}));
        //this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.static('/public'))
        this.app.use(express.urlencoded({extended: true}))


        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Middleware para servir archivos estáticos
        this.app.use(express.static(path.join(__dirname, 'public')));

        // Configurar el motor de plantillas
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'html');

        // Ruta para renderizar las vistas
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'index.html'));
        });


        this.app.get('/dashboard', autenticacionMiddleware, (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
        });
    
        this.app.get('/ingresar', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'login.html'));
        });
    
        this.app.get('/registrarme', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'registrarme.html'));
        });
    
        this.app.get('/terminosycondiciones', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'terminosycondiciones.html'));
        });

        this.app.use('/api', new indexRouter().start());
        this.app.use(errorHandler);

        if(this.persistencia === 'MONGODB') {
            await conexionMongoDB.conectar();
        }

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


