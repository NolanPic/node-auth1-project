const express = require('express');
const users = require('../users/model');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async (req, res) => {

    const user = req.body;
    if(!user.username || !user.password) {
        res.status(400).json({ error: 'Username and password are required' });
    }
    else {

        // check to see if user exists already
        const existingUser = await users.getByUsername(user.username);

        if(existingUser) {
            res.status(409).json({ error: 'This username already exists' });
        }
        else {
            try {
                user.password = bcrypt.hashSync(user.password, 12);
                const created = await users.create(user);
                res.status(201).json(created);
            }
            catch(err) {
                console.log(err);
                res.status(500).json({ error: 'Something went wrong when creating this user' });
            }
        }
    }
});

router.post('/login', async (req, res) => {
    
    const userToLogin = req.body;

    if(!userToLogin.username || !userToLogin.password) {
        res.status(400).json({ error: 'Username and password are required' });
    }

    const userRecord = await users.getByUsername(userToLogin.username);

    if(!userRecord) {
        res.status(400).json({ error: 'User does not exist' })
    }
    else {
        if(bcrypt.compareSync(userToLogin.password, userRecord.password)) {
            req.session.loggedIn = true;
            req.session.userId = userRecord.id;
            res.status(200).json({ message: 'User logged in', user_id: userRecord.id })
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    }
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ error: 'Something went wrong logging out' });
            }
            else {
                res.status(200).json({ message: 'Successfully logged out' })
            }
        });
    }
    else {
        res.send({ message: 'User was already logged out' });
    }
});

module.exports = router;
