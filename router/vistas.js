class Vistas{

    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }

    inicializarVistas(app){
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'index.html'));
        });
    
        this.app.get('/login', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'login.html'));
        });
    
        this.app.get('/registrarme', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'registrarme.html'));
        });
    
        this.app.get('/terminosycondiciones', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'terminosycondiciones.html'));
        });
    }

}

export default Vistas