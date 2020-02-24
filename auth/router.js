const express = require('express');
const users = require('../users/model');

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

module.exports = router;
