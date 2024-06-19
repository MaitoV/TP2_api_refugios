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
export class ErrorSinToken extends ErrorPersonalizado {
  constructor(mensaje = 'No tiene permisos para realizar esta acción. Proporcione su token') {
    super(mensaje, 401);
  }
}
export class ErrorTokenInvalido extends ErrorPersonalizado {
  constructor(mensaje = 'No tiene permisos para realizar esta acción. Provea un token válido') {
    super(mensaje, 401);
  }
}
export class ErrorAnimalInvalido extends ErrorPersonalizado {
  constructor(mensaje = 'Los campos: nombre, tipo, estado y edad son obligatorios') {
    super(mensaje, 401);
  }
}

