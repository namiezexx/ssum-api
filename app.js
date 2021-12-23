const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mainRouter = require('./src/router/MainRouter');
require('dotenv').config();

const cors = require('cors');

// Logger 설정
app.use(logger("[:remote-addr][:method][:url][:date][:status]"), function(req, res, next) {
    next();
});

// cors option 설정
app.use(cors());

// request의 body 데이타를 json으로 parsing하는 미들웨어
app.use(bodyParser.json());
// body 데이타 내부에 중첩된 구문을 parsing하는 옵션
app.use(bodyParser.urlencoded({extended:true}));

// mainRouter 등록
app.use(mainRouter);

// 전역 예외처리 function
app.use(function(req, res, next) {
    const err = new Error();
    err.code = -1;
    err.message = 'Incorrect Uri';
    next(err);
});

app.use(function(err, req, res, next){
    const code = err.code || -9999;
    const message = err.message || 'something wrong!';
    res.status(500).send({code: code, message: message});
});

// 서버 기동
app.listen(process.env.APP_PORT || 3000, function() {
    console.log('start! express server on 3000');
});
