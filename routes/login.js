import express from 'express';
const router = express.Router();
import _ from 'lodash';
import Joi from 'joi';
import auth from '../middleware/auth.js';


router.post('/', async (req, res) => {
    try {
        if (req.session.isLoggedIn) return res.status(400).send('Already logged in', req.session).toString();
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // validate user

        if (req.body.token != "12345") return res.status(400).send('Invalid token');
        else {
            let user = {};
            user._id = "12345";
            req.session.user = user._id;
            req.session.isLoggedIn = true;
            console.log(req.session);
            res.send(req.session);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong').toString();
    }
});

function validate(req) {
    const schema = new Joi.object({
        token: Joi.string().min(5).max(255).required().required()
    });

    return schema.validate(req);
}
export default router;