const redis = require('redis');

exports.init = function(){
    
    // redis数据库,默认监听8808端口,'127.0.0.1'为本地ip(默认不需要修改)
    const redisClient  = redis.createClient('8808', '127.0.0.1');

    // redis验证
    redisClient.auth('root', (err, res)=>{
        if (err&&!res) _console.pink('redis验证异常:'+err)
    })

    // redis 连接错误
    redisClient.on("error", (err)=>{
        _console.pink('redis连接异常:'+err);
    });

    // redis 连接成功
    redisClient.on("connect", ()=>{
        _console.info('redis链接成功------------');
    });

    return redisClient;
};