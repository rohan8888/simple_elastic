const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const host = "localhost";
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.route("/index").post(function(req, res, next){

});

app.route("/search").get(function(req, res, next){

});

app.listen({"host": host, "port": port}, () => console.log(`Server listening on ${host}:${port}`));