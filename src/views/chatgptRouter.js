const express = require("express");
const openai = require("../middlewares/openaiApi");

const chatgptRouter = express.Router();

const allMsg = []; // 全局对话

/* 定义路由接口 */
chatgptRouter.post("/index", async function (req, res) {
    console.log('openai',openai);
    const { model } = req
    const messages = [{role:'user', content: 'Can I make a request?'}]
    const completion = await openai.createCompletion({
        model, messages
    },{
        proxy: {
            host: '127.0.0.1',
            port: 7890
        }
    });
    console.log('completion',completion);
})

module.exports = chatgptRouter;