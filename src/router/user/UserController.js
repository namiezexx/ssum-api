const express = require('express');
const userRouter = express.Router();
const {getUserByIdWithPromise, joinUserWithPromise} = require('../../service/user/UserService');
const {verifyToken} = require('../middlewares/authorization');

userRouter.get('/:id', function(req, res) {

    const id = req.params.id;

    getUserByIdWithPromise(id)
    .then(function(result) {
        console.log(result);
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
        phone: req.body.phone
    };

    //console.log(res.locals);

    joinUserWithPromise(user)
    .then(function (result) {
        res.send(result);
    })
    .catch(function (error) {
        res.status(500).send(error);
    });
});

module.exports = userRouter;