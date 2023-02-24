import Joi from 'joi';
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    amount: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    from: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    to: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    date: {
        type: Date,
        required: true,
    },
    distributionType: {
        type: String,
        required: true,
    },
    distribution: {
        type: Array,
        required: true,
        minlength: 1,
        maxlength: 1024
    }
});

let TransactionModel = {};
TransactionModel.Transaction = mongoose.model('Transaction', transactionSchema);

TransactionModel.validate = function validateTransaction(transaction) {
    const schema = new Joi.object({
        type: Joi.string().min(5).max(255).required(),
        amount: Joi.number().min(1).max(255).required(),
        from: Joi.string().min(5).max(255).required(),
        to: Joi.string().min(5).max(255).required(),
        date: Joi.date().required(),
        distributionType: Joi.string().min(5).max(255).required(),
        distribution: Joi.array().min(1).max(255).required()
    });

    return schema.validate(transaction);
}
