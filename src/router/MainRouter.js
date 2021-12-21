const express = require('express');
const app = express();
const userController = require('./user/UserController');

// user router 등록
app.use('/user', userController);

module.exports = app;