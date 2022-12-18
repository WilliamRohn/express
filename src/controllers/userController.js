const model = require("../models/userModel");
const JWT = require("../utils/jwtUtil");
const svgCaptcha = require('svg-captcha');

module.exports = {
    /* 获取验证码 */
    getsvgCaptcha: async function (req, res) {
        let codeConfig = {
            size: 4,// 验证码长度
            ignoreChars: '1Ooil', // 验证码字符中排除 1Ooil
            noise: 5, // 干扰线条的数量
            color: true,
            fontSize: 24,
        }
        let captcha = svgCaptcha.create(codeConfig);
        let db_res = await model.redisSet(captcha.text.toLowerCase(), JSON.stringify(captcha.data), 60)

        return new Promise((resolve, reject) => {
            if (db_res) resolve(captcha.data); else resolve(null);
        });
    },

    /* 查询验证码 */
    checkCaptcha: async function (captchaText) {
        let db_res = await model.redisGet(captchaText)
        
        return new Promise((resolve, reject) => {
            if (db_res) resolve(true); else resolve(null);
        });  
    },
    /* 实际处理注册请求 */
    register: async function({ username, password }) {
        // 首先查询用户名是否存在
        const users = await model.getUser({ username });
        if (!users.length) {
            return await model.addUser({ username, password });
        } else {
            console.error("register:existedUsers=", users);
            return Promise.resolve({});
        }
    },

    /* 实际处理登录请求 */
    login: async function({ username, password }, req, res) {
        const users = await model.getUser({ username, password });

        // 如果登录成功 记录之
        let token = null;
        let userAgent = req.headers["user-agent"]
        if (users.length) {
            token = JWT.generate({ username })
            await model.redisSet(username, JSON.stringify({ islogin: true, userAgent, token }), 5*24*3600)
        }
        return Promise.resolve({
            code: users.length > 0 ? 200 : 401,
            msg: users.length > 0 ? "登录成功" : "登录失败！账号或密码错误！",
            token
        });
    },

    /* 更新用户信息 */
    updateUser: async function(id,user){
        return await model.updateUser(id,user)
    },

    /* 获取用户信息 */
    getUser: async function(user){
        return await model.getUser(user)
    },
};