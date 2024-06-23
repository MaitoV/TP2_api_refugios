import express from 'express';
import Controlador from '../controlador/autenticacion.js';
import { ErrorAutenticacion } from '../utils/errorPersonalizado.js';
import Autenticacion from '../servicio/autenticacion.js'


class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
        this.autenticacion = new Autenticacion();
    }
    start() {
        this.router.post('/ingresar', async (req, res) => {
            try {
                const { email, contrasenia } = req.body;
                const { token } = await this.autenticacion.login(email, contrasenia);
                
                // Establecer el token en una cookie o enviarlo en la respuesta, luego redirigir
                //res.cookie('token', token, { httpOnly: true });
                res.redirect('/dashboard',token);
            } catch (error) {
                if (error instanceof ErrorAutenticacion) {
                    res.status(401).send('Autenticación fallida');
                } else {
                    res.status(500).send('Error del servidor');
                }
            }
        });

        this.router.post('/registrarme', this.controlador.registrarme);


        this.router.post('/registrarme', async (req, res) => {
            try {
                const { email, contrasenia } = req.body;
                const token = await this.autenticacion.registrarme(email, contrasenia);
                
                // Establecer el token en una cookie o enviarlo en la respuesta, luego redirigir
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/dashboard');
            } catch (error) {
                res.status(500).send('Error del servidor');
            }
        });








        return this.router;
    }
}


export default Router;

