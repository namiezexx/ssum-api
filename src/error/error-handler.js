const NotFoundError = require('./advice/NotFoundError');
const ValidationError = require('./advice/ValidationError');
const DatabaseError = require('./advice/DatabaseError');
const TokenExpiredError = require('./advice/TokenExpiredError');
const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
    
    if(err instanceof TokenExpiredError) {
        logger.error(JSON.stringify(err));
        return res.status(401).json(err);
    }
    else if(err instanceof NotFoundError) {
        logger.error(JSON.stringify(err));
        return res.status(404).json(err);
    }
    else if(err instanceof ValidationError) {
        logger.error(JSON.stringify(err));
        return res.status(400).json(err);
    }
    else if(err instanceof DatabaseError) {
        logger.error(JSON.stringify(err));
        return res.status(500).json(err);
    }

    logger.error(JSON.stringify(err));
    return res.status(500).json(err);
}