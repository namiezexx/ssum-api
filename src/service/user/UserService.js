const DB = require('../../maria/maria');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function getUserByIdWithPromise(email) {
    var user = await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user where email = ?', email);
    if(user.data.length == 1) {
        const token = jwt.sign({
            userId: user.data[0].email  // jwt 토근에 등록할 key 값으로 user 정보 중 email을 key로 사용한다.
        }, JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        user.token = token;
        return user;
    }
};

async function joinUserWithPromise(user) {
    return await DB('INSERT', 'insert into user set ?', user);
};

module.exports = {
    getUserByIdWithPromise,
    joinUserWithPromise
}