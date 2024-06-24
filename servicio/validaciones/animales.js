import Joi from 'joi';

const animalSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.empty': 'El nombre es requerido',
    'any.required': 'El nombre es obligatorio'
  }),
  edad: Joi.string().pattern(/^\d+\s(dia|mes|año|dias|meses|años)$/i).required().messages({
    'string.pattern.base': 'La edad debe comenzar con números, un espacio y luego la palabra día o mes o año o días o meses o años. Ejemplo: 45 días',
    'string.empty': 'La edad es requerida',
    'any.required': 'La edad es obligatoria'
  }),
  estado: Joi.string().valid('adoptado', 'disponible').required().messages({
    'any.only': 'El estado debe ser adoptado o disponible',
    'any.required': 'El estado es obligatorio'
  }),
  tipo: Joi.string().valid('perro', 'gato', 'conejo', 'cobayo', 'hamster').required().messages({
    'any.only': 'El tipo debe ser: perro o gato o conejo o cobayo o hamster',
    'any.required': 'El tipo es obligatorio'
  }),
  descripcion: Joi.string().optional().messages({
    'string.base': 'La descripción debe ser un texto'
  })
});


const validarAnimal = (animal) => {
    const { error, value } = animalSchema.validate(animal, { abortEarly: false });
    if (error) {
          return { error: error.details.map(detail => detail.message) };
    }
        return { value };
};

export default validarAnimal;