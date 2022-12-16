/* cookie校验登录 */
// const loginCheck = function (req, res, next) {
//     if (!req.cookies["username"]) {
//         res.send("请先登录!");
//     } else {
//         next();
//     }
// };

/* session校验登录 */
// const loginCheck = function (req, res, next) {
//     console.log("req.session", req.session);
//     if (!req.session["username"]) {
//         res.send("请先登录!");
//     } else {
//         next();
//     }
// };

/* token校验登录 */
const JWT = require("../utils/jwtUtil");
const { _console } = require('../utils/consoleColor.js');
const model = require("../models/userModel");

const loginCheck = async function (req, res, next) {
    /* 取请求头中的token、userAgent,
        解析token(jwt),
        拿出其中的用户名,
        跟redis中对应的用户信息比对 */
    let token = req.headers.authorization || false
    let decode = JWT.decode(token) || ''
    let userAgent = req.headers["user-agent"] || ''
    const info = JWT.verify(token);
    let db_res = JSON.parse(await model.redisGet(decode.username)) || null
    // 验证登录状态
    if (info&&db_res&&db_res.islogin&&userAgent == db_res.userAgent) {
        next()
    } else {
        _console.dir('JWT:'+info);
        _console.dir('db_res:'+db_res);
        res.json({
            code: 401,
            msg:"请先登录",
        });
    } 
};

module.exports = loginCheck