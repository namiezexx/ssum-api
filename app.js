const express = require('express');
const app = express();
//const logger = require('morgan');
const logger = require('./src/config/logger');
const morganMiddleware = require('./src/config/morganMiddleware');
const bodyParser = require('body-parser');
const mainRouter = require('./src/router/mainRouter');
require('dotenv').config();

const cors = require('cors');
const res = require('express/lib/response');

// Logger 설정
/* app.use(logger("[:remote-addr][:method][:url][:date][:status]"), function(req, res, next) {
    next();
}); */

// cors option 설정
app.use(cors());

// request의 body 데이타를 json으로 parsing하는 미들웨어
app.use(bodyParser.json());
// body 데이타 내부에 중첩된 구문을 parsing하는 옵션
app.use(bodyParser.urlencoded({extended:true}));

//app.use(logger);
//app.use(morganMiddleware);
/*
app.use((req, res, next) => {
    logger.info('==================== req ====================');
    logger.info('req.methd : ' + req.method);
    logger.info('req.path : ' + req.path);
    logger.info('req.headers : ' + JSON.stringify(req.headers));
    logger.info('req.data : ' + req.body);
    logger.info('req.remoteAddress : ' + req.socket.remoteAddress);
    
    next();
})
*/

// mainRouter 등록
app.use(mainRouter);

// 서버 기동
app.listen(process.env.APP_PORT || 3000, function() {
    console.log('start! express server on 3000');
});
