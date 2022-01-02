const express = require('express');
const app = express();

const customError = require('../error/custom-error');
const errorHandler = require('../error/error-handler');

const userController = require('./controller/userController');
const tokenController = require('./controller/tokencontroller');

// user router 등록
app.use('/v1', userController);
app.use('/v1', tokenController);

// 미존재 API 호출 에러 처리 function
app.use(function(req, res, next) {
    throw new customError(-9999, 'Invalid Uri. Check Uri first!')
});

// 공통 에러 처리 function
app.use(errorHandler);

module.exports = app;