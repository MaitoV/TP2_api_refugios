import { ErrorPersonalizado } from "../utils/errorPersonalizado.js";

export const errorHandler = (error, req, res, next) => {
    const codigoEstado = error.codigoEstado || 404;
    const mensaje = error.message || 'contenido no encontrado';

    //TODO: if(error instanceof ErrorPersonalizado) return res.status(codigoEstado).json({error: mensaje})
    return res.status(codigoEstado).json({error: mensaje})
}