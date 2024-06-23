// En middlewares/autenticacion.js
import { ErrorSinToken, ErrorTokenInvalido } from "../utils/errorPersonalizado.js";
import jwt from "jsonwebtoken";
import config from './../config.js';

const autenticacionMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token; // Leer el token de la cookie

        if (!token) throw new ErrorSinToken();

        const tokenDecodificado = jwt.verify(token, config.JWT_SECRET);
        req.user = tokenDecodificado;

        next();
    } catch (error) {
        next(error);
    }
}
export default autenticacionMiddleware;