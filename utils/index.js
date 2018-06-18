const R = require("ramda");

exports.defaultIndex = (doc) => ({"id": doc, "titlePos": [], "dataPos": [], "count": 0, "TF": 0});

exports.defaultIndexContent = () => ({"docs": [], "IDF": 0});

exports.idf = (total, occ) => Math.log10(total/occ).toFixed(2);

exports.emptyCallback = () => {};

exports.sanitize = (word) => word.trim().toLowerCase();

exports.getWords = R.pipe(R.split("."), R.map(s => s.split(" ")), R.flatten, R.filter(R.identity), R.map(exports.sanitize));

exports.getFileIndex = R.useWith(R.findIndex, [R.propEq("id"), R.identity]);