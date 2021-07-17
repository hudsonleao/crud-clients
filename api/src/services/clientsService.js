const exception = require('../../utils/errorsHandling');
const validateCpf = require('../../utils/validateCpf');
module.exports = ({ repositories: { clientsRepository }, mappers: { clientsMapper } }) => {

    return {

        create: async ({ cpf, subject, ...fields }) => {

           const isValidCpf = await validateCpf(cpf);

           if(!isValidCpf) return exception.unprocessableEntity('Invalid CPF', 'clientsService', 'create');

            const { docs: [clientExist] } = await clientsRepository.find({ query: { cpf } });
            if (clientExist) return exception.unprocessableEntity('Client already exists', 'clientsService', 'create');

            const clientCreate = await clientsRepository.create({
                ...fields,
                cpf,
                created_by: subject,
                updated_by: subject,
            });

            return clientsMapper.filter(clientCreate);
        },

        get: async (query) => {
            const options = {
                limit: query.limit ? parseInt(query.limit) : 10,
                page: query.page ? parseInt(query.page) : 1
            };
            delete query.limit;
            delete query.page;
            const clients = await clientsRepository.find({ query, options });

            if (clients.docs.length > 0) return clientsMapper.filterPaginate(clients);

            return clients;
        },

        getById: async (client_id) => {
            const clients = await clientsRepository.findById(client_id);

            if (!clients) return exception.notFound('Client id not found', 'clientsService', 'getById');

            return clientsMapper.filter(clients);
            
        },

        getByString: async (string) => {
            const clients = await clientsRepository.findByString(string);

            if (!clients) return exception.notFound('Client id not found', 'clientsService', 'getByString');

            return clientsMapper.filter(clients);
            
        },

        update: async (query, client_id) => {

            delete query.cpf;

            const clients = await clientsRepository.update(query, client_id);

            if (!clients) return exception.notFound('Client id not found', 'clientsService', 'update');

            return clientsMapper.filter(clients);
        },

        delete: async (query, client_id) => {
            const clients = await clientsRepository.update(query, client_id, true);

            if (!clients) return exception.notFound('Client id not found', 'clientsService', 'delete');

            return clientsMapper.filter(clients);
        },
    };
};