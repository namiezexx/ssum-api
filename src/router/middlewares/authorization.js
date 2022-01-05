const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const TokenExpiredError = require('../../error/advice/TokenExpiredError');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    try {
        const clientToken = req.headers['x-auth-token'];
        const decoded = jwt.verify(clientToken, JWT_SECRET_KEY);
        if(decoded) {
            res.locals.user_email = decoded.userId;
            next();
        } else {
            throw new TokenExpiredError(-2000, "권한이 없는 accessToken 입니다.");
        }
    } catch (err) {
        throw new TokenExpiredError(-2001, "만료된 accessToken 입니다.");

    }
};

exports.verifyToken = verifyToken;