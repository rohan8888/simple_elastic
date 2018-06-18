let GlobalCache = {};

exports.get = (key) => GlobalCache[key];
exports.set = (key, value) => GlobalCache[key] = value;
exports.del = (key) => delete GlobalCache[key];