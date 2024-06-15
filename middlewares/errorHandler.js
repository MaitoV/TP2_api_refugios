export const errorHandler = (error, req, res, next) => {
    const codigoEstado = error.codigoEstado || 404;
    const mensaje = error.mensaje || 'contenido no encontrado';

    res.status(codigoEstado).json({
        estado: 'error',
        codigoEstado,
        mensaje,
    })
}