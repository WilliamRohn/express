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
function redisSet(_key, value, expire) {
    return new Promise(async (resolve, reject)=>{
        /* redis操作的回调函数第一个参数默认是异常报错,所以一定要cb做异常处理 */
        try {
            redisClient().set(_key,value, (err,res)=>{
                if (err&&res) resolve(null);
                if (!isNaN(expire) && expire > 0) {
                    redisClient().expire(_key, parseInt(expire));
                    _console.info(`redis-set ${_key}写入成功,${expire}秒后过期`);
                }
                resolve(res)
            })
        } catch (error) {
            resolve(null)
        }
    })
}

function redisGet(_key) {
    return new Promise((resolve, reject)=>{
        /* redis操作的回调函数第一个参数默认是异常报错,所以一定要cb做异常处理 */
        try {
            redisClient().get(_key, (err,res)=>{
                _console.info(`redis-get ${_key}查询成功,查询结果:${err+','+res}`);
                if (err&&res) resolve(null); else resolve(res)
            })
        } catch (error) {
            resolve(null)
        }
    });
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    redisSet,
    redisGet,
};