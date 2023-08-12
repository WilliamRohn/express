/* 引入依赖 */
const express = require("express");
const bodyParser = require('body-parser');
const { _console } = require('./utils/consoleColor.js');
/* 登录校验中间件 */
const loginCheck = require("./middlewares/loginCheck");

/* 引入路由 */
const indexRouter = require("./views/indexRouter");
const chatgptRouter = require("./views/chatgptRouter");
const userRouter = require("./views/userRouter");
// const fileRouter = require("./views/fileRouter");

const multer = require("multer");
const { register } = require("./controllers/userController.js");

/* 创建express实例 */
const app = express();

// 使用中间件
app.use(bodyParser.json()) // 支持 json 格式
// 使用第三方插件 qs 来处理
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/static", express.static('public'))
// 全局_console
global._console = _console

app.use("/", indexRouter);
app.use("/chatgpt", chatgptRouter);
app.use("/user", userRouter);
// app.use("/file", fileRouter);

/* 添加路由中间件 */
// app.use((req,res,next)=>{
//     let ingoreRoutes = ['login','register','verifycode','favicon.ico','checkcode','chatgpt','search']
//     if (req.path.includes(ingoreRoutes)) {
//         next()
//     } else {
//         loginCheck(req,res,()=>{
//             next()
//         })
//     }
// })

/* 挂载到指定端口 */
const server = app.listen(8002, function () {
    const port = server.address().port;
    console.log(`访问地址为 http://localhost:${port}`);
});