const express = require("express");
const { getClientIp } = require("../utils/utils");
const router = express.Router();
const loginCheck = require("../middlewares/loginCheck");
const puppeteer = require("../middlewares/puppeteer")

/* 定义路由接口 */
router.get("/", function (req, res) {
    let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
    res.send(`Welcom to indexRouter...Your IP is ${ip ? ip : getClientIp(req)}`);
});

/* GET /testtoken 使用自定义中间件：验证token */
router.get("/testtoken", loginCheck, (req, res, next) => res.end("token test ok"));

/* GET /cros 故意跨域的接口 */
router.get("/cros", function (req, res) {
    // res.header('Access-Control-Allow-Origin', '*')
    let ipAddress = req.ip.substring(7)
    res.send({msg:'IP地址:'+ipAddress})
})


/* GET /user/xxx 搜索抖音用户接口 */
router.get(`/search${/\w+/}`, async function (req, res) {
    const userId = req.path.split("/")[2]
    const result = puppeteer.launch(userId)
    res.send({msg: result})
})

module.exports = router;