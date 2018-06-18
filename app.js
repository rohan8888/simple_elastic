const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const idx = require("./controllers/indexing");
const search = require("./controllers/search");

const host = "localhost";
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
* Expects payload with 3 mandatory params
* 1. id
* 2. title
* 3. data
* */
app.route("/index").post(async function (req, res, next) {
    try {
        await idx.writeFileAndUpdateIndex(req.body);
        return res.json("200 OK");
    } catch (err) {
        next(err);
    }
});

/*
* Must specify search parameter using `q` parameter in querystring
* */
app.route("/search").get(async function (req, res, next) {
    try {
        let results = await search.searchIndexes(req.query);
        return res.json(results);
    } catch (err) {
        next(err);
    }
});

/*
* Default error handler
*/
app.use((err, req, res) => res.json(err));

app.listen({"host": host, "port": port}, () => console.log(`Server listening on ${host}:${port}`));