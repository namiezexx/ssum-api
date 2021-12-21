const maria = require('../../maria/maria');

function getUserById(id, callback) {

    maria.query('select * from user where user_id =' + id, function(err, row) {
        if(err) throw err;
        if(row[0]) {
            var result = {result: 'ok', message: '성공하였습니다.', email: row[0].email, name: row[0].name};
            console.log('userService 성공 : ' + result.email);
            callback(result);
        } else {
            var result = {result: 'none', message: '요청하신 id에 해당하는 사용자 정보가 없습니다.'};
            console.log('userService 실패 : ' + result);
            callback(result);
        }
    });
}

function getUserByIdWithPromise(id) {
    return new Promise(function (resolve, reject) {

        maria.query('select * from user where user_id =' + id, function(err, row) {

            if(err) throw err;

            if(row[0]) {
                console.log('유저 조회 성공');
                var result = {result: 'ok', message: '성공하였습니다.', email: row[0].email, name: row[0].name};
                resolve(result);
            } else {
                console.log('유저 조회 실패');
                var result = {result: 'none', message: '요청하신 id에 해당하는 사용자 정보가 없습니다.'};
                reject(result);
            }
        });
    });
};

module.exports.getUserById = getUserById;
module.exports.getUserByIdWithPromise = getUserByIdWithPromise;