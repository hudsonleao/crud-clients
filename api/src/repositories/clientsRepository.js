module.exports = ({ models: { clientsModel } }) => {

    return {
        find: async ({ query = {}, options = {} }) => {
            if (query.q) {
                return clientsModel.paginate({"name" : new RegExp(query.q, 'i'), is_deleted: false})
            }
            return clientsModel.paginate({ ...query, is_deleted: false }, options);
        },

        findById: async (client_id) => {
            return clientsModel.findById(client_id);
        },

        create: async (data) => {
            return clientsModel.create(data);
        },

        update: async (query, client_id, is_deleted = false) => {
            return clientsModel.findOneAndUpdate({ ...client_id, is_deleted: false }, { ...query, is_deleted }, { new: true });
        }
    };
};