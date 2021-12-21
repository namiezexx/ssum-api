const express = require('express');
const app = express();
const userRouter = require('./user/UserRouter');

// user router 등록
app.use('/user', userRouter);

module.exports = app;