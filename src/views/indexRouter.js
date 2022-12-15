const express = require("express");
/* 登录校验中间件 */
const loginCheck = require("../middlewares/loginCheck");

const router = express.Router();

/* 定义路由接口 */
router.get("/", function (req, res) {
    res.send("Hello From indexRouter");
});

/* 使用自定义中间件：验证token */
router.get("/testtoken", loginCheck, (req, res, next) => res.end("token test ok"));

module.exports = router;