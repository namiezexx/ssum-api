const express = require('express');
const app = express();
const userController = require('./user/UserController');

// user router 등록
app.use('/v1', userController);

module.exports = app;