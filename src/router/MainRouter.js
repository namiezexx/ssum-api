const express = require('express');
const app = express();

const logger = require('../config/logger');

const NotFoundError = require('../error/advice/NotFoundError');
const errorHandler = require('../error/error-handler');

const userController = require('./controller/userController');
const tokenController = require('./controller/tokencontroller');

// API 호출 시 초기 로깅 router 등록
app.use(function(req, res, next) {
    logger.info('-------------------- service start --------------------');
    logger.info(req.url);
    logger.info(req.headers);
    logger.info(req.body);

    next();
});

// user router 등록
app.use('/v1', userController);
app.use('/v1', tokenController);

// 미존재 API 호출 에러 처리 function
app.use(function(req, res, next) {
    throw new NotFoundError(-9999, 'Invalid API Call. Check Uri first!')
});

// 공통 에러 처리 function
app.use(errorHandler);

module.exports = app;