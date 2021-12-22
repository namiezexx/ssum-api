const express = require('express');
const tokenRouter = express.Router();

const {getUserByEmail} = require('../../service/user/UserService');

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();

tokenRouter.post('/refresh/token', function(req, res) {

    const token = req.body.refreshToken;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const email = decoded.userId;
    
    getUserByEmail(email)
    .then(function(result) {

        const accessToken = jwt.sign({
            userId: email
        }, JWT_SECRET_KEY, {
            expiresIn: '1h'
        });
    
        const refreshToken = jwt.sign({
            userId: email
        }, JWT_SECRET_KEY, {
            expiresIn: '240h'
        });

        res.send({code: 0, msg: "성공하였습니다.", data:{accessToken: accessToken, refreshToken: refreshToken}});
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send({msg: 'refresh token error!'});
    });

    
});

module.exports = tokenRouter;