const R = require("ramda");

const ignoreWords = ["the", "a", "and", "is", "or"];

exports.defaultIndex = (doc) => ({"id": doc, "titlePos": [], "dataPos": [], "count": 0, "inTitle": 0, "TF": 0});

exports.defaultIndexContent = () => ({"docs": [], "IDF": 0});

exports.idf = (total, occ) => Math.log10(total/occ).toFixed(2);

exports.emptyCallback = () => {};

exports.sanitize = (word) => word.trim().toLowerCase();

exports.getWords = R.pipe(R.split("."), R.map(s => s.split(" ")), R.flatten, R.filter(R.identity), R.map(exports.sanitize), R.without(ignoreWords));

exports.getFileIndex = R.useWith(R.findIndex, [R.propEq("id"), R.identity]);

exports.sortByTermFrequency = R.sortWith([R.descend(R.prop('inTitle')), R.descend(R.prop('TF'))]);

exports.getFilesFromIndex = (docs) => docs.map(d => d.id);

exports.union = R.unionWith(R.eqBy(R.prop("id")));