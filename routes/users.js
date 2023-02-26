import express from 'express';
const router = express.Router();
import _ from 'lodash';
import Joi from 'joi';
import UserModel from '../models/user.js';
import auth from '../middleware/auth.js';


async function checkIfUserExistsById(userId) {
    try {
        let userCheck = await UserModel.User.findById(userId);
        if (!userCheck) return {
            statusCode: 400,
            message: 'User not found'
        }
        return {
            statusCode: 200,
            message: userCheck
        }
    }
    catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            message: 'Something went wrong'
        }
    }
}



router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        if (req.session.isLoggedIn) return res.status(400).send('Already logged in', req.session).toString();
        const { error } = validateLogin(req.body);
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

router.post('/logout', auth, async (req, res) => {
    try {
        req.session.destroy();
        res.send("Logged out");
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong').toString();
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        let user = await UserModel.User.findById(req.session.user);
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong').toString();
    }
});

router.get('/all', auth, async (req, res) => {
    try {
        let users = await UserModel.User.find();
        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong').toString();
    }
});

router.post('/addFriends', auth, async (req, res) => {
    try {
        const { error } = validateAddFriends(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //check if user already exists
        let usersToAddAsFriend = [];
        let currUser = await UserModel.User.findById(req.session.user);
        for (let i = 0; i < req.body.members.length; i++) {
            console.log("req.body.members[i] is :", req.body.members[i]);
            let userCheck = await checkIfUserExistsById(req.body.members[i]);
            if (userCheck.statusCode == 200) {
                // check if user is already a friend
                let isFriend = currUser.friends.includes(req.body.members[i]);
                if (!isFriend) {
                    usersToAddAsFriend.push(req.body.members[i]);
                }
            }
        }
        console.log("uersToAddAsFriend is :", usersToAddAsFriend);
        currUser.friends = currUser.friends.concat(usersToAddAsFriend);
        await currUser.save();
        res.send("Friends added", usersToAddAsFriend);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong').toString();
    }
});


function validateLogin(req) {
    const schema = new Joi.object({
        token: Joi.string().min(5).max(255).required().required()
    });

    return schema.validate(req);
}

function validateAddFriends(req) {
    const schema = new Joi.object({
        friends: Joi.array().min(1).max(255).required(),
        userId: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

export default router;