const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = () => {

    const clientsSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        created_by: {
            type: String
        },
        updated_by: {
            type: String
        },
        is_deleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

    clientsSchema.plugin(mongoosePaginate);

    return model('clients', clientsSchema);
};