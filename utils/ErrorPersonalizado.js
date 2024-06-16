export class ErrorPersonalizado extends Error {
    constructor(mensajeError, codigoError) {
        super(mensajeError);
        this.codigoEstado = codigoError;
      }
}

export class ErrorAutenticacion extends ErrorPersonalizado {
    constructor(mensaje = 'El email o la contraseña no coinciden') {
      super(mensaje, 401);
    }
}
export class ErrorAutenticacionCamposVacios extends ErrorPersonalizado {
    constructor(mensaje = 'El campo email y el campo contraseña no pueden estar vacíos') {
      super(mensaje, 400);
    }
}

