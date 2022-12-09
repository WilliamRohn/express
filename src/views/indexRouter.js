const express = require("express");
/* 登录校验中间件 */
const loginCheck = require("../middlewares/loginCheck");

const router = express.Router();

/* 定义路由接口 */
// GET /
router.get("/", function (req, res) {
    res.send("Hello From indexRouter");
});

// GET http://localhost:8002/get?a=12&b=34
router.get("/get", function (req, res) {
    res.send(
        JSON.stringify({
            ...req.query,
        })
    );
});

/* 使用自定义中间件 */
router.get("/testtoken", loginCheck, (req, res, next) => res.end("token test ok"));

module.exports = router;