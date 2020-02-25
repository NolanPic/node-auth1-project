const users = require('../users/model');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    }
    else {
        res.status(401).json({ error: 'User does not have access' });
    }
};
