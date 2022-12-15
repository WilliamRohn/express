const express = require("express");
const JWT = require("../utils/jwtUtil");
const controller = require("../controllers/userController");
const { _console } = require('../utils/consoleColor.js');
// const { getUser, updateUser } = require("../models/userModel");

const userRouter = express.Router();

userRouter.get("/", function (req, res, next) {
    res.send("用户首页");
})

/* POST /user 用户注册 */
userRouter.post("/register", async (req, res) => {
    const result = await controller.register(req.body);
    if (result.acknowledged) {
        res.send({code: 200, msg:'注册成功'})
    } else {
        res.send({code: 400, msg:'用户已存在'})
    }
});

/* POST /user 用户登录 */
userRouter.post("/login", async (req, res) => {
    const ret = await controller.login(req.body, req, res);
    res.send(ret)
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