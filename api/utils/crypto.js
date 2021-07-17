const crypto = require('crypto');
const exception = require('./errorsHandling');

module.exports = {
    createHash: async (password) => {
        try {
            return crypto.createHash('md5').update(password).digest('hex');
        } catch (error) {
            exception.internalServerError(error, 'crypto', 'createHash');
        }
    },
};