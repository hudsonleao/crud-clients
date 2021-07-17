const exception = require('../../utils/errorsHandling');
const middleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req, {
            stripUnknown: true,
            allowUnknown: true
        });

        if (!error) return next();

        const { details } = error;
        const message = details.map(i => i.message).join(',');
        exception.badRequest(message, 'validationMiddleware');
    };
};
module.exports = middleware;