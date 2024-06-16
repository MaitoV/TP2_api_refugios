export const errorHandler = (error, req, res, next) => {
    const codigoEstado = error.codigoEstado || 404;
    const mensaje = error.message || 'contenido no encontrado';

    return res.status(codigoEstado).json({error: mensaje})
}