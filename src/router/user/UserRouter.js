const express = require('express');
const userRouter = express.Router();
const userService = require('../../service/user/UserService');

userRouter.get('/:id', function(req, res) {
    /* userService.getUserById(req.params.id, function(result){
        console.log('callback 함수 호출');
        console.log('UserRouter : ' + result.email);
        res.send(result);
    }); */

    userService.getUserByIdWithPromise(req.params.id)
    .then(function (result) {
        res.send(result);
    })
    .catch(function (error) {
        res.send(error);
    });
});

userRouter.post('/join', function(req, res) {

    var body = req.body;
    var email = body.email;
    var name = body.name;
    var password = body.password;
    var phone = body.phone;

    var sqlParam = {email: email, name: name, password: password, phone: phone};
    const existUser = maria.query('SELECT * FROM user WHERE email = "' + email + '"', function(err, rows) {

        if(err) throw err;
        if(rows[0]) {
            res.send('이미 등록된 유저입니다.');
        } else {
            const user = maria.query('INSERT INTO user SET ? ', sqlParam, function(err, rows) {
                if(err) throw err;
                if(rows) {
                    console.log('ok db insert');
                    console.log(rows);
                    res.json({insertId: rows.insertId});
                } else {
                    console.log('insert error occur!');
                    res.json({code: -1});
                }
            });
        }
    });
});

module.exports = userRouter;