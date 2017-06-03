"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var opn = require("opn");
// import API from backend
var cars_1 = require("./app/routes/api/cars");
var app = express();
var port = 8080;
var path = require('path');
var connection_string = 'mongodb://nick:98765@ds161159.mlab.com:61159/sampledb_ns';
mongoose.connect(connection_string).then(function () {
    console.log('Successful connections made to ' + connection_string);
}).catch(function (err) {
    console.log('Not able to load ' + connection_string);
});
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./app/www/'));
// mount APIs
app.use('/v1/api/cars', cars_1.default);
app.get('/', function (req, res) {
    res.sendFile(path.resolve('app/www/views/index.html'));
});
app.get('*', function (req, res) {
    res.sendFile(path.resolve('app/www/views/404.html'));
});
app.listen(port, function () {
    console.log('Listening on port ' + port);
    opn('http://localhost:' + port);
});
