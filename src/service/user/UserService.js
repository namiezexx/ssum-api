const DB = require('../../maria/maria');
const NotFoundError = require('../../error/advice/NotFoundError');
const ValidationError = require('../../error/advice/ValidationError');
const responseService = require('../responseService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');
const res = require('express/lib/response');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function loginUser(email, password) {
    
    var user = await DB('GET', 'select user_id, email, password, name, phone, profile_image_url, provider from user where email = ?', email);

    if(user.length == 0) {
        throw new NotFoundError(-1002, '사용자 조회 오류. 이메일을 확인하세요.');
    }

    const verified = bcrypt.compareSync(password, user.data[0].password);
    if(verified == false) {
        throw new ValidationError(-1003, '사용자 비밀번호 확인 요망.');
    }

    if(user.length == 1) {
        const accessToken = jwt.sign({
            userId: user.data[0].email  // jwt 토근에 등록할 key 값으로 user 정보 중 email을 key로 사용한다.
        }, JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({
            userId: user.data[0].email  // jwt 토근에 등록할 key 값으로 user 정보 중 email을 key로 사용한다.
        }, JWT_SECRET_KEY, {
            expiresIn: '240h'
        });
        
        const data = {accessToken: accessToken, refreshToken: refreshToken};

        return responseService(data);
        
    }
};

async function joinUserWithPromise(user) {

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    user.password = encryptedPassword;

    const data = await DB('INSERT', 'insert into user set ?', user);

    return responseService(data);
};

async function getUserByEmail(email) {

    const data = await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user where email = ?', email);
    return responseService(data);
};

async function getUsers(page) {

    const result = await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user order by user_id desc limit ?, ?', [(10 * (page-1)), 10]);
    const count = await DB('GET', 'select count(*) as totalItems from user');

    data.totalItems = count.data[0].totalItems;
    data.totalPages = Math.ceil(result.totalItems / 10);
    data.first = false;
    data.last = false;

    if(page == 1)                 data.first = true;
    if(page == data.totalPages) data.last = true;
    
    return responseService(data);
};

async function updateUser(email, user) {

    const data = await DB('UPDATE', 'update user set ? where email = ?', [user, email]);

    return responseService(data);
};

async function deleteUser(email) {

    const data = await DB('DELETE', 'delete from user where email = ?', email);

    return responseService(data);
};

module.exports = {
    loginUser,
    joinUserWithPromise,
    getUserByEmail,
    getUsers,
    updateUser,
    deleteUser
}