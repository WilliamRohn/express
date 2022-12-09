const path = require("path");

const publicPath = path.resolve("public");
const imgPath = path.join(publicPath, "img");

module.exports = {
    jwtSecret: "jinwandalaohu",
    publicPath,
    imgPath,
};