import Joi from 'joi';
import mongoose from 'mongoose';


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    members: {
        type: Array,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    balance: {
        type: Array,
        required: true,
        minlength: 0,
        maxlength: 1024
    }
});

let GroupModel = {};
GroupModel.Group = mongoose.model('Group', groupSchema);

GroupModel.validate = function validateGroup(group) {
    const schema = new Joi.object({
        name: Joi.string().min(5).max(255).required(),
        members: Joi.array().min(1).max(255).required()
    });

    return schema.validate(group);
}


export default GroupModel;

