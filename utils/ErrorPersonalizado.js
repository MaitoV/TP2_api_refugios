export class ErrorPersonalizado extends Error {
    constructor(mensajeError, codigoError) {
        super(mensajeError);
        this.codigoEstado = codigoError;
      }
}

export class ErrorAutenticacion extends ErrorPersonalizado {
    constructor(mensaje = 'El email o la contraseña no coinciden con los registrados') {
      super(mensaje, 400);
    }
}
export class ErrorCamposAutenticacionVacios extends ErrorPersonalizado {
  constructor(mensaje = 'El email y la contraseña son campos obligatorios para autenticarse') {
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
export class ErrorRefugioNoPropietario extends ErrorPersonalizado {
  constructor(mensaje = 'No tiene permisos para modificar un animalito que no es propiedad de su refugio') {
    super(mensaje, 401);
  }
}
export class ErrorArchivoFaltante extends ErrorPersonalizado {
  constructor(mensaje = 'No se ha subido ningún archivo') {
    super(mensaje, 400)
  }
}
export class ErrorArchivoIncorrecto extends ErrorPersonalizado {
  constructor(mensaje = 'Solo se permiten archivos de tipo Excel (.xls, .xlsx)') {
    super(mensaje, 400)
  }
}
export class ErrorDeValidacion extends ErrorPersonalizado {
  constructor(mensaje) {
    super(mensaje, 400)
  }
}
export class ErrorEmailEnUso extends ErrorPersonalizado {
  constructor(mensaje= "Conflicto - el email ya está registrado") {
    super(mensaje, 409)
  }
}
export class ErrorBodyVacio extends ErrorPersonalizado {
  constructor(mensaje= "El cuerpo de la solicitud no puede estar vacío. Faltan campos obligatorios.") {
    super(mensaje, 400)
  }
}
