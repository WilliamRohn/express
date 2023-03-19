/* 引入依赖 */
const express = require("express");
const bodyParser = require('body-parser');
const { _console } = require('./utils/consoleColor.js');
/* 登录校验中间件 */
const loginCheck = require("./middlewares/loginCheck");

/* 引入路由 */
const indexRouter = require("./views/indexRouter");
const userRouter = require("./views/userRouter");
// const fileRouter = require("./views/fileRouter");

const multer = require("multer");

/* 创建express实例 */
const app = express();

// 使用中间件
app.use(bodyParser.json()) // 支持 json 格式
// 使用第三方插件 qs 来处理
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/static", express.static('public'))
// 全局_console
global._console = _console

/* 添加路由中间件 */
app.use((req,res,next)=>{
    if (req.path.includes("login")||req.path.includes("register")||req.path.includes("verifycode")||req.path.includes("favicon.ico")||req.path.includes("checkcode")) {
        next()
    } else {
        loginCheck(req,res,()=>{
            next()
        })
    }
})

app.use("/", indexRouter);
app.use("/user", userRouter);
// app.use("/file", fileRouter);

/* 挂载到指定端口 */
const server = app.listen(8002, function () {
    const port = server.address().port;
    console.log(`访问地址为 http://localhost:${port}`);
});