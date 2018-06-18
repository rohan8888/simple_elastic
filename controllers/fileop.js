const fs = require("fs");
const {promisify} = require("util");
const fileDir = process.cwd() + "/documents/";
const indexDir = process.cwd() + "/indexes/";

const writeToDisk = (fileName, content, next) => fs.writeFile(fileDir + fileName, content, next);

const getNumberOfDocuments = (cb) => fs.readdir(fileDir, (err, files) => cb(null, files.length));

const doesFileExist = function (fileName, cb) {
    fs.stat(fileDir + fileName, (err, s) => {
        if (err) return cb(null, false);

        cb(null, true);
    })
};

const readIndex = function (fileName, cb) {
    fs.readFile(fileDir + fileName + ".json", (err, data) => {
        cb(null, JSON.parse(data));
    })
};

module.exports = {
    writeToDisk: promisify(writeToDisk),
    getNumberOfDocuments: promisify(getNumberOfDocuments),
    doesFileExist: promisify(doesFileExist),
    readIndex: promisify(readIndex)
};