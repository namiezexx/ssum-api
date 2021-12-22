const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();

const verifyToken = (req, res, next) => {

    try {
        const clientToken = req.headers['x-auth-token'];
        const decoded = jwt.verify(clientToken, JWT_SECRET_KEY);
        if(decoded) {
            res.locals.user_email = decoded.userId;
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};

exports.verifyToken = verifyToken;