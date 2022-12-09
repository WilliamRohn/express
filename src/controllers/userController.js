const model = require("../models/userModel");
const JWT = require("../utils/jwtUtil");

module.exports = {
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
    login: async function({ username, password }) {
        const users = await model.getUser({ username, password });

        // 如果登录成功 记录之
        let token = null;
        if (users.length) {
            token = JWT.generate({ username });
            console.log("login:token=", token);
        }

        return Promise.resolve({
            code: users.length > 0 ? 200 : 401,
            msg: users.length > 0 ? "登录成功" : "登录失败！账号或密码错误！",
            token,
        });
    },

    /* 更新用户信息 */
    updateUser: async function(id,user){
        return await model.updateUser(id,user)
    },

    /* 获取用户信息 */
    getUser: async function(user){
        return await model.getUser(user)
    }
};