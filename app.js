const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mainRouter = require('./src/router/MainRouter');

// request의 body 데이타를 json으로 parsing하는 미들웨어
app.use(bodyParser.json());
// body 데이타 내부에 중첩된 구문을 parsing하는 옵션
app.use(bodyParser.urlencoded({extended:true}));

// mainRouter 등록
app.use(mainRouter);

// 전역 예외처리 function
app.use(function(err, req, res, next){
    console.error('app.use.error');
    res.status(500).send('Something broke!');
});

app.listen(3000, function() {
    console.log('start! express server on 3000');
});

