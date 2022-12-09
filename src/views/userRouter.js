const express = require("express");
const controller = require("../controllers/userController");
// const { getUser, updateUser } = require("../models/userModel");

const userRouter = express.Router();

userRouter.get("/", function (req, res, next) {
    res.send("用户首页");
})

userRouter.post("/register", async (req, res) => {
    console.log('用户注册',{...req.body});
    const result = await controller.register(req.body);
    if (result.acknowledged) {
        res.send({code: 200, msg:'注册成功'})
    } else {
        res.send({code: 400, msg:'用户已存在'})
    }
});

userRouter.post("/login", async (req, res) => {
    const ret = await controller.login(req.body);
    res.send(ret)
});

/* POST /user 提交用户修改信息 */
userRouter.post("/info", async (req, res) => {
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
    delete users[0].password
    delete users[0]._id
    res.json(users[0])
});

module.exports = userRouter;