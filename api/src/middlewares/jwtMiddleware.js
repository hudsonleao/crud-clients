const jwt = require('jsonwebtoken');
const exception = require('../../utils/errorsHandling');

module.exports = (app) => {

    app.use(async (req, res, next) => {
        try {
            const { headers } = req;
            if (req.originalUrl === '/api/v1/auth' || req.originalUrl === '/api/v1/docs/') return next();

            jwt.verify(headers.authorization ? headers.authorization.replace('Bearer', '').trim() : headers.authorization, process.env.JWT_SECRET, { algorithm: 'HS256' }, (err, decoded) => {
                if (err || !decoded.user) exception.unauthorized('Invalid token', 'validation');
                headers.subject = decoded.user;
            });

            next();
        } catch (err) {
            next(err);
        }
    });
};