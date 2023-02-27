import express from 'express';
import _ from 'lodash';
import auth from '../middleware/auth.js';
import GroupModel from '../models/group.js';
import UserModel from '../models/user.js';

const router = express.Router();


async function getGroupById(id) {
    try {
        let group = await GroupModel.Group.findById(id);
        if (!group) return {
            statusCode: 400,
            message: 'Group not found'
        }
        return {
            statusCode: 200,
            message: group
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            message: 'Something went wrong'
        }
    }
}


async function getGroups() {
    try {
        let groups = await GroupModel.Group.find();
        return {
            statusCode: 200,
            message: groups
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            message: 'Something went wrong'
        }
    }
}

async function addMembersToGroup(groupId, userIds) {
    try {
        let group = await GroupModel.Group.findById(groupId);
        if (!group) return {
            statusCode: 400,
            message: 'Group not found'
        }
        //check if users already exists in group
        let usersToAdd = [];
        for (let userId of userIds) {
            if (!group.members.includes(userId)) {
                usersToAdd.push(userId);
            }
        }
        group.members.push(...usersToAdd);
        await group.save();
        return {
            statusCode: 200,
            message: group
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



async function createGroup(group) {
    try {
        let newGroup = new GroupModel.Group(group);
        await newGroup.save();
        return {
            statusCode: 200,
            message: newGroup
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            message: 'Something went wrong'
        }
    }
}


router.get('/', auth, async (req, res) => {
    try {
        let groups = await getGroups();
        return res.status(groups.statusCode).send(groups.message);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong').toString();
    }
});


router.get('/:id', auth, async (req, res) => {
    try {
        let group = await getGroupById(req.params.id);
        return res.status(group.statusCode).send(group.message);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong').toString();
    }
});

router.post('/create', auth, async (req, res) => {
    try {
        const { error } = GroupModel.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //check if user already exists
        console.log("req.body is :", req.body);
        console.log("req.body.members is :", req.body.members);

        for (let i = 0; i < req.body.members.length; i++) {
            console.log("req.body.members[i] is :", req.body.members[i]);
            let user = await UserModel.User.findById(req.body.members[i]);
            if (!user) return res.status(400).send('User not found');
        }

        let group = createGroup(_.pick(req.body, ['name', 'members']));
        return res.status(group.statusCode).send(group.message);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong').toString();
    }
});

router.post('/addMembers', auth, async (req, res) => {
    try {
        const { error } = GroupModel.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let result = await addMembersToGroup(req.body.groupId, req.body.members);
        return res.status(result.statusCode).send(result.message);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong').toString();
    }
});

export default router;