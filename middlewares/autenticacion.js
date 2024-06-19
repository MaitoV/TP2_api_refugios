import { ErrorSinToken, ErrorTokenInvalido } from "../utils/errorPersonalizado.js";
import jwt from "jsonwebtoken";

const autenticacionMiddleware = (req, res, next) => {
    try {
        const cabeceraAutenticacion = req.headers.authorization;

        if (!cabeceraAutenticacion) throw new ErrorSinToken();
    
        const token = cabeceraAutenticacion.split(' ')[1];
    
        if(!token) throw new ErrorTokenInvalido();
    
        const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecodificado;
    
        next();
    } catch (error) {
        next(error);
    }
}

export default autenticacionMiddleware;