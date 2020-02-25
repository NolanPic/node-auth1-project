const express = require('express');
const authRouter = require('./auth/router');
const userRouter = require('./users/router');
const session = require('express-session');

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
    }
};

server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;
