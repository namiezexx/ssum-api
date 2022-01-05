const express = require('express');
const userRouter = express.Router();
const logger = require('../../config/logger');
const {loginUser, joinUserWithPromise, getUserByEmail, getUsers, updateUser, deleteUser} = require('../../service/user/userService');
const {verifyToken} = require('../middlewares/authorization');

userRouter.post('/login', function(req, res, next) {

    email = req.body.email;
    password = req.body.password;

    loginUser(req.body.email, req.body.password)
    .then(function(result) {
        res.json(result);
    })
    .catch(next);
});

userRouter.post('/join', function(req, res, next) {

    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        profile_image_url: req.body.profileImageUrl
    };

    joinUserWithPromise(user)
    .then(function (result) {
        res.json(result);
    })
    .catch(next);
});

userRouter.get('/user', verifyToken, function(req, res) {

    const email = res.locals.user_email;  // verifyToken 미들웨어를 통과하면 res.locals 항목에 email 정보가 세팅된다.

    getUserByEmail(res.locals.user_email)
    .then(function(result) {
        res.json(result);
    })
    .catch(next);
});

userRouter.get('/user/:page', verifyToken, function(req, res) {
    const page = req.params.page || 1;

    getUsers(page)
    .then(function(result) {
        res.json(result);
    })
    .catch(next);
});

userRouter.put('/user', verifyToken, function(req, res) {
    
    const email = res.locals.user_email;

    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        profile_image_url: req.body.profileImageUrl
    };

    updateUser(email, user)
    .then(function(result) {
        res.json(result);
    })
    .catch(next);
});


userRouter.delete('/user', verifyToken, function(req, res) {
    
    const email = res.locals.user_email;

    deleteUser(email)
    .then(function(result) {
        res.json(result);
    })
    .catch(next);
});

module.exports = userRouter;