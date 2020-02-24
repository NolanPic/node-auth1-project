const users = require('../users/model');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    const user = req.headers;

    if (!user.username || !user.password) {
        res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const userRecord = await users.getByUsername(user.username);

        if (!userRecord) {
            res.status(400).json({ error: 'User does not exist' })
        }
        else {
            if (bcrypt.compareSync(user.password, userRecord.password)) {
                next();
            }
            else {
                res.status(401).json({ error: 'You shall not pass!' })
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong with this request' });
    }
};
