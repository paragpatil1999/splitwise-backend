import express from 'express';
const router = express.Router();
import _ from 'lodash';
import session from 'express-session';
import UserModel from '../models/user.js';


router.post('/', async (req, res) => {
    try {
        const { error } = UserModel.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await UserModel.User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');
        console.log(`User ${req.body.name} with email:${req.body.email} is registering`);
        user = new UserModel.User(_.pick(req.body, ['name', 'email', 'UpiID']));
        await user.save();
        console.log(`User ${user.name} created with email:${user.email}`);
        res.send("User created");
        req.session.user = user._id;
        req.session.isLoggedIn = true;
        console.log(req.session);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong').toString();
    }
});

export default router;