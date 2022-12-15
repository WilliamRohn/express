const db = require("../db/operation");
const collectionName = "user"
const { init: redisClient } = require("../db/redisOperations")

function addUser(user) {
    console.log("userModel addUser: ", user);
    return db.execCreate(collectionName, user);
}

function getUser(user) {
    console.log("userModel getUser", user);
    return db.execRetrieve(collectionName,user);
}

function updateUser(id, user) {
    console.log("userModel updateUser:id",id);
    return db.execUpdate(collectionName, id, user);
}

/* redisSet 往redis中存数据,expire为过期时间,单位为秒 */
function redisSet(_key, value, expire, cb) {
    redisClient().set(_key,value,(err,res)=>{
        /* redis操作的回调函数第一个参数默认是异常报错,所以一定要cb做异常处理 */
        if (err||res) {
            console.error(err);
            cb(err,null);
            return;
        }
        if (!isNaN(expire) && expire > 0) {
            redisClient().expire(_key, parseInt(expire));
            _console.info(`redis-set ${_key}写入成功,${expire}秒后过期`);
        }
        cb(res)
    })
}

function redisGet(_key, cb) {
    redisClient().get(_key, function(err,res){
        /* redis操作的回调函数第一个参数默认是异常报错,所以一定要cb做异常处理 */
        if (err||res) {
            cb(null);
            return;
        }
        cb(res)
    })
}
module.exports = {
    addUser,
    getUser,
    updateUser,
    redisSet,
    redisGet,
};