const express = require('express');
const userRouter = express.Router();
const userService = require('../../service/user/UserService');

userRouter.get('/:id', function(req, res) {

    const id = req.params.id;

    userService.getUserByIdWithPromise(id)
    .then(function (result) {
        var responseMessage = {result: 'ok', message: '성공하였습니다.', data: result};
        res.send(responseMessage);
    })
    .catch(function (error) {
        var responseMessage = {result: 'fail', message: '요청하신 id에 해당하는 사용자 정보가 없습니다.'};
        res.send(responseMessage);
    });
});

userRouter.post('/join', function(req, res) {

    const user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone
    };

    console.log(user);

    userService.joinUserWithPromise(user)
    .then(function (result) {
        res.send(result);
    })
    .catch(function (error) {
        res.send(error);
    });
});

module.exports = userRouter;