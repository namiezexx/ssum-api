const express = require('express');
const app = express();
const customError = require('../error/custom-error');
const userController = require('./controller/UserController');
const tokenController = require('./controller/Tokencontroller');

// user router 등록
app.use('/v1', userController);
app.use('/v1', tokenController);

// 전역 예외처리 function
app.use(function(req, res, next) {
    throw new customError(-9999, 'Invalid Uri. Check Uri first!')
});

module.exports = app;