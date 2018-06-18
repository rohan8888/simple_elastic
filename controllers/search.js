const F = require("./fileop");
const U = require("../utils");
const C = require("../cache");

const getFilesFromIndex = async function (files) {
    let fileResults = [];
    for(let i in files){
        let r = await F.readFile(files[i] + ".txt");
        fileResults.push(r);
    }
    return fileResults;
};

const searchIndexes = async function (query) {
    if (!query.q) throw "invalid search term";

    let resultsFromCache = C.get(query.q);
    if(resultsFromCache) return resultsFromCache;

    let searchTerms = query.q.split(" ");
    let fileList = [];
    for (let i in searchTerms) {
        let result = await F.readIndex(searchTerms[i] + ".json");
        fileList = U.union(fileList, result.docs);
        // fileList = fileList.concat(result.docs);
    }
    let files = U.getFilesFromIndex(fileList);
    return await getFilesFromIndex(files);
};


module.exports = {
    searchIndexes: searchIndexes
};