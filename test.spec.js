const app = require("./app");
const supertest = require("supertest");

describe("POST v1/login", () => {
  it("return users", (done) => {
    supertest(app)
      .post("/v1/login")
      .send({
        email: "test9999@naver.com",
        password: "12345",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

// describe('회원 테스트', () => {
//     test('로그인 정상 처리 확인', async(done) => {
//         const response = await request(app)
//         .post('/v1/login')
//         .send({
//             email: 'test9999@naver.com',
//             password: '12345'
//         });
//         await expect(response.status).toEqual(200);
//         done();
//     });

//     test('회원가입 정상 처리 확인', async(done) => {
//         const response = await request(app)
//         .post('/v1/join')
//         .send({
//             email: 'test9999@naver.com',
//             name: '홍길동',
//             password: '12345',
//             phone: '01035221767'
//         });
//         await expect(response.status).toEqual(500);
//         await expect(response.body.code).toEqual(-1001);  // 일치하는 값 확인
//         await expect(response.body.message).toMatch('오류');  // 포함되는 값 확인
//         done();
//     });
// });
