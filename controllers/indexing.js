const async = require("async");
const F = require("./fileop");
const U = require("../utils");
const C = require("../cache");

const prepareIndexMeta = function (payload) {

    let indexes = {};
    let titleWords = U.getWords(payload.title);
    indexes = titleWords.reduce((idx, w, i) => {
        indexes[w] = indexes[w] || U.defaultIndex(payload.id);
        indexes[w]["count"]++;
        indexes[w]["titlePos"].push(i);
        indexes[w]["TF"] = (indexes[w]["count"] / titleWords.length).toFixed(2);

        return indexes;
    }, {});

    let dataWords = U.getWords(payload.data);
    indexes = dataWords.reduce((idx, w, i) => {
        indexes[w] = indexes[w] || U.defaultIndex(payload.id);
        indexes[w]["count"]++;
        indexes[w]["dataPos"].push(i);
        indexes[w]["TF"] = (indexes[w]["count"] / dataWords.length).toFixed(2);

        return indexes;
    }, indexes);

    return indexes;
};

const writeIndexesToDisk = async function(indexes, next){
    let f = await F.getNumberOfDocuments();
    C.set("total_docs", f);
    for(let idx in indexes){
        let fileExists = await F.doesFileExist(idx + ".json");
        if(fileExists){

        }else{
            let content = U.defaultIndexContent();
            content["docs"].push(indexes[idx]);
            content["IDF"] = U.idf(C.get("total_docs"), 1);
            await F.writeToDisk(idx + ".json", JSON.stringify(content))
        }
    }
};

const writeFileAndUpdateIndex = async function (payload, next) {
    if (!payload.id || !payload.title || !payload.data) return next("invalid input");

    let fileName = payload.id + ".txt";
    let content = JSON.stringify(payload);

    await F.writeToDisk(fileName, content);
    const indexes = prepareIndexMeta(payload);

    await writeIndexesToDisk(indexes, next);
};

module.exports = {
    writeFileAndUpdateIndex: writeFileAndUpdateIndex
};
