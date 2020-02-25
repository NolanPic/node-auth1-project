const express = require('express');
const authRouter = require('./auth/router');
const userRouter = require('./users/router');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knexDb = require('./data/db-config');

const server = express();

const sessionConfig = {
    name: 'user',
    secret: 'You threw off my groove!',
    resave: false, // if nothing has changed, should the session be re-saved?
    saveUninitialized: true, // related to GDPR compliance, the user should be given the option on the frontend
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // this cookie will expire after 30 days
        secure: false, // HTTPS vs HTTP. Should always be true in production
        httpOnly: true // if true, JS on the frontend cannot access this cookie
    },
    store: new KnexStore({
        knex: knexDb,
        tablename: 'sessions', // the table that the sessions will be saved to
        createtable: true, // creates the table if it doesn't exist
        sidfieldname: 'sid', // id column name--'sid' is default
        clearInterval: 1000 * 60 * 60 * 24 * 24, // after this amount of time, clear expired sessions
        // ************^^^^^^^^^^^^^^^^^^^^ cannot go over 24 days because it doesn't fit in a 32-bit signed integer
    })
};

server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;
