const logger = require('../config/logger');

module.exports = (data) => {
    var response = new Object();
    response.code = 0;
    response.message = '정상입니다.';

    if(data != undefined) 
        response.data = data;
    
    logger.info(JSON.stringify(response));
    logger.info('-------------------- service end --------------------');

    return response;
}