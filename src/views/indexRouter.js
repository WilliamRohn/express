const express = require("express");
const { getClientIp } = require("../utils/utils");
/* 登录校验中间件 */
const loginCheck = require("../middlewares/loginCheck");

const router = express.Router();

/* 定义路由接口 */
router.get("/", function (req, res) {
    let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
    res.send(`Welcom to indexRouter...Your IP is ${ip ? ip : getClientIp(req)}`);
});

/* 使用自定义中间件：验证token */
router.get("/testtoken", loginCheck, (req, res, next) => res.end("token test ok"));

module.exports = router;