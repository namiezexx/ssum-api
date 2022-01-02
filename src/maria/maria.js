const maria = require('mysql2/promise');
const conf = require('./conf');
const pool = maria.createPool(conf.db_info);
const customError = require('../error/custom-error');

const DB = async(type, sql, params) => { // async, await
    
    // state : 쿼리문 실행 성공시 true 실패 false
    // error : 쿼리문 error 정보 반환
    let result = {}; // 반환 값
    const connection = await pool.getConnection(async conn => conn); // 생성된 풀 정보로 DB 연결
    try {
        const [rows] = await connection.query(sql, params); // sql 쿼리문 실행
        
        /**
         * Stored Procedure를 활용하는 방법은 아래와 같다.
         * 
         * Procedure의 rows 리턴값은 결과데이타 이외에 Procedure의 값이 포함되어 있다.
         */
        //const [rows] = await connection.query('call SELECT_USER_BY_ID()');
        //console.log(rows[0]);
        
        result.code = 0;
        result.message = '성공하였습니다.';
        result.length = rows.length;
        if(type == "GET" && rows.length > 0) result.data = rows;
        connection.release(); // 사용된 풀 반환
        return result;
    } catch (err) {
        connection.release();
        throw new customError(-1001, 'db처리 오류! 거래로그 확인 요망.');
    }
}

module.exports = DB;