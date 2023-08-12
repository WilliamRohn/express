const express = require("express");
const JWT = require("../utils/jwtUtil");
const decrypt = require("../utils/utils.js");
const controller = require("../controllers/userController");
const { getUser, updateUser } = require("../models/userModel");

const userRouter = express.Router();

/* 获取验证码 */
userRouter.get("/verifycode", async function (req, res) {
    const codeDate = await controller.getsvgCaptcha()
    if (codeDate) {
        res.send(codeDate)
    } else {
        res.send({code: 400, msg: '获取验证码失败'})
    }
})

/* 查询验证码 */
userRouter.get("/checkcode", async function (req, res) {
    const checkCaptcha = await controller.checkCaptcha(req.query.code.toLowerCase());
    if (checkCaptcha) {
        res.send({code: 200, msg: '验证码查询成功'})
    } else {
        res.send({code: 400, msg: '查询验证码失败'})
    }
})

/* POST /user 用户注册 */
userRouter.post("/register", async (req, res) => {
    const result = await controller.register(req.body);
    const checkCaptcha = await controller.checkCaptcha(req.body.code.toLowerCase());

    if (result.acknowledged&&checkCaptcha) {
        res.send({code: 200, msg:'注册成功'})
    } else {
        res.send({code: 400, msg:'用户已存在'})
    }
});

/* POST /user 用户登录 */
userRouter.post("/login", async (req, res) => {
    const ret = await controller.login(req.body, req, res);
    // console.log(ret);
    // res.send(ret)
    const checkCaptcha = await controller.checkCaptcha(req.body.code.toLowerCase());

    if (checkCaptcha) {
        res.send(ret)
    } else {
        res.send({code: 400, msg:'验证码错误'})
    }
    
});

/* POST /user 修改用户信息 */
userRouter.post("/info", async (req, res) => {
    const info = JWT.verify(req.headers.authorization);
    console.log(info);
    const users = await controller.getUser({ username: req.body.username })
    const result = await controller.updateUser(users[0]._id,req.body)
    if (result.acknowledged) {
        res.send({code: 200, msg:'用户信息修改成功'})
    } else {
        res.send({code: 400, msg:'用户信息修改失败'})
    }
});

/* GET /user/xxx 获取用户信息 */
userRouter.get(`/info${/\w+/}`, async (req, res) => {
    let users = await controller.getUser({ username: req.path.split("/")[2] })
    if (users.length==0) {
        res.json({code: 400, msg: `获取用户 ${req.path.split("/")[2]} 信息失败`})
    }
    delete users[0].password
    delete users[0]._id
    res.json({
        code: 200,
        msg: '获取用户信息成功',
        data: {...users[0]}
    })
});

module.exports = userRouter;