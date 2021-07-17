const calculateAge = require('../../utils/calculateAge');

module.exports = {

    filter: async ({ _id, name, email, phone, cpf, gender, dateOfBirth, street, number, city, state, country, created_by, updated_by, created_at, updated_at }) => {
        return { _id, name, email, phone, cpf, gender, dateOfBirth, street, number, city, state, country, age: calculateAge(dateOfBirth), created_by, updated_by, created_at, updated_at };
    },

    filterPaginate: async ({
        docs = [],
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCounter,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    }) => {

        const data = {
            docs: docs.map(({ _id, name, email, phone, cpf, gender, dateOfBirth, street, number, city, state, country, created_by, updated_by, created_at, updated_at }) => {
                return { _id, name, email, phone, cpf, gender, dateOfBirth, street, number, city, state, country, age: calculateAge(dateOfBirth), created_by, updated_by, created_at, updated_at };
            }),
            totalDocs,
            limit,
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        };

        return data;
    }
};