const { MongoClient, ObjectId } = require("mongodb");
const { url, dbname } = require("./dbconfig");

/* 获取指定集合的连接对象 */
function getCollection(collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            // if (err) throw err;
            if (err) {
                reject(err);
            } else {
                resolve({
                    collection: db.db(dbname).collection(collectionName),
                    db,
                });
            }
        });
    });
}

/* 通用回调：无论成败皆关闭数据库连接 */
function callback({ db, resolve, reject }, { res, err }) {
    db.close();
    if (err) {
        console.error("db callback:err=", err);
        reject(err);
    } else {
        console.log("db callback:res=",res);
        resolve(res);
    }
}

/* 向指定集合中添加数据 */
function execCreate(collectionName, content) {
    return new Promise(async (resolve, reject) => {
        try {
            const { collection, db } = await getCollection(collectionName);
            collection.insertOne(content, function (err, res) {
                callback({ db, resolve, reject }, { res, err });
            });
        } catch (err) {
            reject(err);
        }
    });
}

/* 根据条件从指定集合查询数据 */
function execRetrieve(collectionName, whereOption = {}, { skip, limit } = {}) {
    console.log("db execRetrieve:whereOption", whereOption);
    console.log("db execRetrieve:skip/limit", skip, limit);
    const { MongoClient } = require("mongodb");
    // const url = "mongodb://localhost:27017/";

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            // if (err) throw err;
            if (err) {
                reject(err);
            } else {
                const dbo = db.db(dbname);

                let data = dbo.collection(collectionName).find(whereOption);

                if (skip && limit) {
                    data = data.skip(skip).limit(limit);
                }

                data.toArray(function (err, result) {
                    db.close();

                    // 返回集合中所有数据
                    // if (err) throw err;
                    if (err) {
                        reject(err);
                    } else {
                        // console.log("db execRetrieve:result=", result);
                        resolve(result);
                    }
                });
            }
        });
    });
}

/* 更新数据 */
function execUpdate(collectionName, id, content) {
    console.log("db execUpdate:id/content=", id, content);
    return new Promise(async (resolve, reject) => {
        try {
            const { collection, db } = await getCollection(collectionName);
            collection.updateOne(
                { _id: ObjectId(id) },
                {$set:content},
                function (err, res) {
                    callback({ db, resolve, reject }, { res, err });
                }
            );
        } catch (err) {
            console.log("err=",err);
            reject(err);
        }
    });
}

/* 删除数据 */
function execDelete(collectionName, id) {
    return new Promise(async (resolve, reject) => {
        try {
            const { collection, db } = await getCollection(collectionName);
            collection.deleteOne({ _id: ObjectId(id) }, function (err, obj) {
                db.close();
                if (err) {
                    reject(err);
                } else {
                    // console.log("文档删除成功");
                    resolve({ msg: "删除文档成功" });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

/* 对外导出增删改查四大操作 */
module.exports = {
    execCreate,
    execRetrieve,
    execUpdate,
    execDelete,
}