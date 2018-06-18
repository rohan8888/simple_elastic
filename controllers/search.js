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
        if(!result) continue;

        fileList = U.union(fileList, result.docs);
    }
    let files = U.getFilesFromIndex(fileList);
    let finalResults =  await getFilesFromIndex(files);
    C.set(query.q, finalResults);
    return finalResults;
};


module.exports = {
    searchIndexes: searchIndexes
};