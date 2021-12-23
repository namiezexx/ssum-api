const DB = require('../../maria/maria');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function loginUser(email, password) {
    var user = await DB('GET', 'select user_id, email, password, name, phone, profile_image_url, provider from user where email = ?', email);

    if(user.length == 0) {
        return {code: -1, msg: "사용자 조회 오류. 로그인 정보를 확인하세요."};
    }

    const verified = bcrypt.compareSync(password, user.data[0].password);
    if(verified == false) {
        return {code: -1, msg: "비밀번호를 확인하세요."};
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
        
        return {code: 0, msg: "성공하였습니다.", data:{accessToken: accessToken, refreshToken: refreshToken}};
        
    }
};

async function joinUserWithPromise(user) {

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    user.password = encryptedPassword;

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