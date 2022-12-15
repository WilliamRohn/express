const redis = require('redis');

exports.init = function(){
    
    // redis数据库,默认监听8808端口,'127.0.0.1'为本地ip(默认不需要修改)
    const redisClient  = redis.createClient('8808', '127.0.0.1');

    // redis 链接错误
    redisClient.on("ready", function(error) {
        console.error('redis-connect is ready:');
    });
    // redis 链接错误
    redisClient.on("error", function(error) {
        console.error('redis-connect is error:', error);
    });

    return redisClient;
};