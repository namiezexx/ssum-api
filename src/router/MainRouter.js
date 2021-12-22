const express = require('express');
const app = express();
const userController = require('./controller/UserController');
const tokenController = require('./controller/Tokencontroller');

// user router 등록
app.use('/v1', userController);
app.use('/v1', tokenController);

module.exports = app;