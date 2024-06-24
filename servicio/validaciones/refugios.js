import Joi from 'joi'

const refugioSchema = Joi.object({
    nombre: Joi.string().min(5).required().messages({
        'string.min': 'El nombre debe tener al menos 5 caracteres.',
        'string.empty': 'El nombre es requerido, no puede estar vacío.',
        'any.required': 'El nombre es requerido, no puede estar vacío.'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es requerido, no puede estar vacío.',
        'string.email': 'El email debe tener un formato válido.',
        'any.required': 'El email es requerido.'
    }),
    contrasenia: Joi.string().min(8).required().messages({
        'string.empty': 'La contraseña es requerida, no puede estar vacía.',
        'string.min': 'La contraseña debe tener al menos 8 caracteres.',
        'any.required': 'La contraseña es requerida, no puede estar vacia'
    }),
    telefono: Joi.string().pattern(/^\+5490?\d{9,10}$/).required().messages({
        'string.pattern.base': 'El teléfono debe tener un formato válido de número de Argentina (+549XXXXXXXXXX).',
        'string.empty': 'El teléfono es requerido, no puede estar vacío',
        'any.required': 'El teléfono es requerido, no puede estar vacío'
    })
});

const validarRefugio = (refugio) => {
    const { error, value } = refugioSchema.validate(refugio, { abortEarly: false });
    if (error) {
          return { error: error.details.map(detail => detail.message) };
    }
        return { value };
};

export default validarRefugio;