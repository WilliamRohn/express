const jsonwebtoken = require("jsonwebtoken");
// const jwtSecret = "test_key";
const { jwtSecret } = require("../config");

class JWT {
    /* 生成token 返回token*/
    static generate(value, expires = "7 day") {
        // value 为传入值， expires为过期时间，这两者都会在token字符串中体现
        try {
            let token = jsonwebtoken.sign(value, jwtSecret, { expiresIn: expires });
            return token
        } catch (e) {
            console.error("jwt sign error --->", e);
            return "";
        }
    }

    /* 解析token */
    static decode(token) {
        try {
            return jsonwebtoken.decode(token);
        } catch (e) {
            console.error("jwt decode fail --->", e);
            return false;
        }
    }

    /* 校验token 返回载荷或false*/
    static verify(token) {
        try {
            // 如果过期将返回false
            return jsonwebtoken.verify(token, jwtSecret);
        } catch (e) {
            console.error("jwt verify error --->", e);
            return false;
        }
    }
}
module.exports = JWT;

/* 小案例 */
// (function () {
//     /* 载荷（角色/权限描述信息） */
//     const payload = {
//         // uuid: "3455445-acuya7skeasd-iue7",
//         // phone: 133409899625,
//         username:"admin",
//         password:"123456"
//     };

//     // 生成token 有效时长20s
//     const token = JWT.generate(payload, "3s");
//     console.log("token", token);

//     // 校验token 得到payload
//     const info = JWT.verify(token);
//     console.log("verifiedRet", info);

//     /* 3秒后再次校验 */
//     setTimeout(() => {
//         console.log("检验过期token");
//         const info2 = JWT.verify(token);
//         console.log("info2", info2); // false
//     }, 3000);
// })();