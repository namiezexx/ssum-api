const DB = require('../../maria/maria');

function getUserByIdWithPromise(id) {
    return new Promise(async function (resolve, reject) {

        DB('GET', 'selecta user_id, email, name, phone, profile_image_url, provider from user where user_id = ?', id).then(function(res) {
            resolve(res);
        });

        /*
        await connection1.query('select user_id, email, name, phone, profile_image_url, provider from user where user_id = ?', id, function(err, rows) {
            if(err) throw new Error(err);
            if(rows.length) {
                resolve(rows);
            } else {
                reject(rows);
            }
        }); */
    });
};

function joinUserWithPromise(user) {
    return new Promise( function (resolve, reject) {
        
        const existUser = pool.query('SELECT * FROM user WHERE email = "' + user.email + '"', function(err, rows) {

            if(err) throw err;
            if(rows.length) {
                var result = {result: 'fail', message: '이미 등록된 유저입니다. 로그인하시기 바랍니다.'};
                reject(result);
            } else {
                
                const savedUser = pool.query('INSERT INTO user SET ? ', user, function(err, rows) {
                    if(err) throw new Error(err);
                    var result = {result: 'ok', message: "성공하였습니다.", data: {insertId: rows.insertId}};
                    resolve(result);
                });
            }
        });
    });
};

module.exports = {
    getUserByIdWithPromise,
    joinUserWithPromise
}