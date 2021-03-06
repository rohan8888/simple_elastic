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
        indexes[w]["inTitle"]++;
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

const writeIndexesToDisk = async function(indexes){
    let f = await F.getNumberOfDocuments();
    C.set("total_docs", f);
    for(let idx in indexes){
        let fileExists = await F.doesIndexExist(idx + ".json");
        if(fileExists){
            let content = await F.readIndex(idx + ".json");
            let i = U.getFileIndex(indexes[idx]["id"], content.docs);
            if(i !== -1){
                content.docs[i] = indexes[idx];
            }else{
                content.docs.push(indexes[idx]);
                content["IDF"] = U.idf(C.get("total_docs"), content.docs.length);
            }
            content.docs = U.sortByTermFrequency(content.docs);
            await F.saveIndexes(idx + ".json", JSON.stringify(content));
        }else{
            let content = U.defaultIndexContent();
            content["docs"].push(indexes[idx]);
            content["IDF"] = U.idf(C.get("total_docs"), 1);
            await F.saveIndexes(idx + ".json", JSON.stringify(content))
        }
    }
};

const writeFileAndUpdateIndex = async function (payload) {
    if (!payload.id || !payload.title || !payload.data) throw "invalid input";

    await F.writeDocumentToDisk(payload.id + ".txt", JSON.stringify(payload));
    const indexes = prepareIndexMeta(payload);

    await writeIndexesToDisk(indexes);
};

module.exports = {
    writeFileAndUpdateIndex: writeFileAndUpdateIndex
};
