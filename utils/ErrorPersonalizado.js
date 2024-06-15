class ErrorPersonalizado extends Error {
    constructor(mensajeError, codigoError) {
        super(mensajeError);
        this.codigoEstado = codigoError;
      }
}

export class ErrorAutenticacion extends ErrorPersonalizado {
    constructor(mensaje = 'Credenciales inválidas') {
      super(mensaje, 401);
    }
}

