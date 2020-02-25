const db = require('../data/db-config');

module.exports = {
    create,
    get,
    getByUsername
};

async function create(user) {
    return db('users').insert(user);
}

async function get() {
    return db('users')
        .select('*');
}

async function getByUsername(username) {
    return db('users')
        .where({ username })
        .first();
}
