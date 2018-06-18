const fs = require("fs");
const {promisify} = require("util");
const fileDir = process.cwd() + "/documents/";
const indexDir = process.cwd() + "/indexes/";

const writeDocumentToDisk = (fileName, content, next) => fs.writeFile(fileDir + fileName, content, next);

const saveIndexes = (fileName, content, next) => fs.writeFile(indexDir + fileName, content, next);

const getNumberOfDocuments = (cb) => fs.readdir(fileDir, (err, files) => cb(null, files.length));

const doesIndexExist = function (fileName, cb) {
    fs.stat(indexDir + fileName, (err) => cb(null, !err));
};

const readFile = function(fileName, cb){
    fs.readFile(fileDir + fileName, (err, data) => cb(null, JSON.parse(data)));
};

const readIndex = function (fileName, cb) {
    fs.readFile(indexDir + fileName, (err, data) => cb(null, err ? null : JSON.parse(data)));
};

module.exports = {
    writeDocumentToDisk: promisify(writeDocumentToDisk),
    getNumberOfDocuments: promisify(getNumberOfDocuments),
    doesIndexExist: promisify(doesIndexExist),
    readIndex: promisify(readIndex),
    saveIndexes: promisify(saveIndexes),
    readFile: promisify(readFile)
};