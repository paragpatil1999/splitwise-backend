import Joi from 'joi';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    UpiID: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    Friendswith: {
        type: Array,
        required: true,
        minlength: 0,
        maxlength: 1024
    }
});

let UserModel = {};
UserModel.User = mongoose.model('User', userSchema);

UserModel.validate = function validateUser(user) {
    const schema = new Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        UpiID: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(user);
}


export default UserModel;