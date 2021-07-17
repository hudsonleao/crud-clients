const Joi = require('joi');

const headers = {
    headers: Joi.object().keys({
        authorization: Joi.string().required()
    })
};

const schemas = {
    createClients: Joi.object().keys({
        headers,
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(10).max(11).required(),
            gender: Joi.string().valid('M', 'F', 'other').required(),
            dateOfBirth: Joi.date().required(),
            street: Joi.string().required(),
            number: Joi.number().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            cpf: Joi.string().min(11).max(11).required(),
        })
    }),

    getClients: Joi.object().keys({
        headers
    }),

    getClientsById: Joi.object().keys({
        headers,
        params: Joi.object().keys({
            client_id: Joi.string().required()
        })
    }),

    updateClients: Joi.object().keys({
        headers,
        params: Joi.object().keys({
            client_id: Joi.string().required()
        }),
        body: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email(),
            phone: Joi.string().min(10).max(11),
            gender: Joi.string().valid('M', 'F', 'other'),
            dateOfBirth: Joi.date(),
            street: Joi.string(),
            number: Joi.number(),
            city: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
        })
    }),

    deleteClients: Joi.object().keys({
        headers,
        params: Joi.object().keys({
            client_id: Joi.string().required()
        })
    }),
};

module.exports = schemas;