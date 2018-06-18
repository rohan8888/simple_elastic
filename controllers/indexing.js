const fs = require("fs");
const {promisify} = require("util");

const writeToDisk = promisify((fileName, content, next) => fs.writeFile(process.cwd() + "/documents/" + fileName, content, next));

const writeFileAndUpdateIndex = async function (payload, next) {
    if (!payload.id || !payload.title || !payload.data) return next("invalid input");

    let fileName = payload.id + ".txt";
    let content = JSON.stringify(payload);

    await writeToDisk(fileName, content);

};

module.exports = {
    writeFileAndUpdateIndex: writeFileAndUpdateIndex
};
