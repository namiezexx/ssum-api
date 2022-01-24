const express = require('express');
const app = express();
const rTracer = require('cls-rtracer');
const logger = require('./src/config/logger');
const bodyParser = require('body-parser');
const mainRouter = require('./src/router/mainRouter');
require('dotenv').config();

// swagger 설정
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerSpec = yaml.load("./src/swagger/build.yaml");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const cors = require('cors');
const res = require('express/lib/response');

// cors option 설정
app.use(cors());

// request의 body 데이타를 json으로 parsing하는 미들웨어
app.use(bodyParser.json());
// body 데이타 내부에 중첩된 구문을 parsing하는 옵션
app.use(bodyParser.urlencoded({extended:true}));

app.use(rTracer.expressMiddleware())

console.log(process.env.NODE_ENV);

// mainRouter 등록
app.use(mainRouter);

// 서버 기동
app.listen(process.env.APP_PORT || 3000, function() {
    console.log('start! express server on 3000');
});

module.exports = app;