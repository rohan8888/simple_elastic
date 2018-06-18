const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const idx = require("./controllers/indexing");

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
app.route("/index").post(function(req, res, next){
    idx.writeFileAndUpdateIndex(req.body, (e, r) => {
        if(e) return next(e);

        res.json(r);
    });
});

app.route("/search").get(function(req, res, next){

});

/*
* Default error handler
* */
app.use((err, req, res) => res.json(err));

app.listen({"host": host, "port": port}, () => console.log(`Server listening on ${host}:${port}`));