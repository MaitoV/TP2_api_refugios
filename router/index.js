import { Router } from "express";
import RefugiosRouter from './refugios.js';
import AutenticacionRouter from './autenticacion.js';

class IndexRouter {
    constructor() {
        this.router = Router();
        this.inicializarRutas();
    }
    inicializarRutas() {
        this.router.use('/refugios', new RefugiosRouter().start());
        this.router.use('/autenticacion', new AutenticacionRouter().start());
    }
    start() {
        return this.router;
    }
}


export default IndexRouter;

