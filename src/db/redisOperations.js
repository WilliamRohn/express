const redis = require('redis');

exports.init = function(){
    
    // redis数据库,默认监听8808端口,'127.0.0.1'为本地ip(默认不需要修改)
    const redisClient  = redis.createClient('8808', '127.0.0.1');

    // 在Redis6.0之前的版本中，验证登陆Redis Server只需要输入密码(前提配置了密码 requirepass )
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