const express = require('express');
const userRouter = express.Router();
const {loginUser, joinUserWithPromise, getUserByEmail, getUsers, updateUser, deleteUser} = require('../../service/user/UserService');
const {verifyToken} = require('../middlewares/authorization');

userRouter.post('/login', function(req, res) {

    const email = req.body.email;

    loginUser(email)
    .then(function(result) {
        res.send(result);
    })
    .catch(function(err) {
        res.status(500).send({msg: 'error test'});
    });
});

userRouter.post('/join', verifyToken, function(req, res) {

    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        profile_image_url: req.body.profileImageUrl
    };

    joinUserWithPromise(user)
    .then(function (result) {
        res.send(result);
    })
    .catch(function (err) {
        res.status(500).send(err);
    });
});

userRouter.get('/user', verifyToken, function(req, res) {

    const email = res.locals.user_email;  // verifyToken 미들웨어를 통과하면 res.locals 항목에 email 정보가 세팅된다.

    getUserByEmail(res.locals.user_email)
    .then(function(result) {
        res.send(result);
    })
    .catch(function (err){
        res.status(500).send(err);
    });
});

userRouter.get('/user/:page', verifyToken, function(req, res) {
    const page = req.params.page || 1;

    getUsers(page)
    .then(function(result) {
        res.send(result);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
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
        res.send(result);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
});

userRouter.delete('/user', verifyToken, function(req, res) {
    
    const email = res.locals.user_email;

    deleteUser(email)
    .then(function(result) {
        res.send(result);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
});

module.exports = userRouter;