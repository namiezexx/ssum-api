const DB = require('../../maria/maria');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function loginUser(email) {
    var user = await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user where email = ?', email);
    if(user.data.length == 1) {
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
        
        return {code: 0, msg: "성공하였습니다.", data:{accessToken: accessToken, refreshToken: refreshToken}};
        
    }
};

async function joinUserWithPromise(user) {
    return await DB('INSERT', 'insert into user set ?', user);
};

async function getUserByEmail(email) {
    return await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user where email = ?', email);
};

async function getUsers(page) {
    const result = await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user order by user_id desc limit ?, ?', [(10 * (page-1)), 10]);
    const count = await DB('GET', 'select count(*) as totalItems from user');

    result.totalItems = count.data[0].totalItems;
    result.totalPages = Math.ceil(result.totalItems / 10);
    result.first = false;
    result.last = false;

    if(page == 1)                 result.first = true;
    if(page == result.totalPages) result.last = true;
    
    return result;
};

async function updateUser(email, user) {
    await DB('UPDATE', 'update user set ? where email = ?', [user, email]);
    console.log(email);
    return await DB('GET', 'select user_id, email, name, phone, profile_image_url, provider from user where email = ?', email);
};

async function deleteUser(email) {
    return await DB('DELETE', 'delete from user where email = ?', email);
};

module.exports = {
    loginUser,
    joinUserWithPromise,
    getUserByEmail,
    getUsers,
    updateUser,
    deleteUser
}