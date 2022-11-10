const Joi = require('joi');

const newPostSchema = Joi.object().keys({
    authorComment: Joi.string()
        .required()
        .min(1)
        .max(500)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('El comentario del autor es requerido');
            }

            return new Error(
                'El comentario debe tener entre 1 y 500 caracteres.'
            );
        }),
    hashtag: Joi.string()
        .min(0)
        .max(255)
        .lowercase()
        .error((errors) => {
            return new Error(
                'Los hashtags no pueden superar los 255 caracteres'
            );
        }),
});

module.exports = { newPostSchema };
