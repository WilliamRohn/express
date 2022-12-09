const db = require("../db/operation");
const collectionName = "user"

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

module.exports = {
    addUser,
    getUser,
    updateUser,
};