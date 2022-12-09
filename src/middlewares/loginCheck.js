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
const regToken = /Bearer (.+)/
const loginCheck = function (req, res, next) {
    const token = req.headers.authorization
    const info = JWT.verify(token);
    console.log("verifiedRet", info);

    info ? next() : res.json({
        code: 401,
        msg:"请先登录"
    });
};

module.exports = loginCheck