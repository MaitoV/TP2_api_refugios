import { ErrorPersonalizado } from "../utils/errorPersonalizado.js";

export const errorHandler = (error, req, res, next) => {
    const codigoEstado = error.codigoEstado || 500;
    const mensaje = error.message || 'Error interno del servidor';

    if(error instanceof ErrorPersonalizado) return res.status(codigoEstado).json({error: mensaje})
    return res.status(codigoEstado).json({error: mensaje})
}