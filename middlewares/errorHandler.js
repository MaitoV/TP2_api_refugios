import { ErrorPersonalizado } from "../utils/errorPersonalizado.js";

export const errorHandler = (err, req, res, next) => {
    if (err.name === 'ErrorSinToken' || err.name === 'ErrorTokenInvalido') {
        return res.status(401).json({ message: 'Autenticación fallida' });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Error Interno del Servidor',
        error: err
    });
};