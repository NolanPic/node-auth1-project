const express = require('express');
const users = require('./model');
const auth = require('../auth/auth-middleware');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const userArr = await users.get();
        res.status(200).json(userArr);
    }
    catch(err) {
        res.status(500).json({ error: 'Something went wrong getting users' });
    }
});

module.exports = router;
