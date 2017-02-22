var express = require('express');
var fs  = require("fs");
var cors = require('cors');
var app = express();
var PORT = 3000;

//CORS Allow All
app.use(cors());

//GET Data
app.get('/gas_station_locations', function (req, res) {
// app.get('/', function (req, res) {
    fs.readFile('./assets/data/gas_station_locations.txt', function(err, f){
        var array = f.toString().split('\n');
        var json = [];
        for (var i = 0; i<array.length; i++){
            var object = {
                lat: array[i].split(" ")[0] === undefined ? "" : parseFloat(array[i].split(" ")[0].trim()),
                long: array[i].split(" ")[1] === undefined ? "" : parseFloat(array[i].split(" ")[1].trim())
            };
            json.push(object);
        }
        res.json(json);
    });
});

app.get('/ev_station_locations', function (req, res) {
// app.get('/', function (req, res) {
    fs.readFile('./assets/data/EV_station_locations.txt', function(err, f){
        var array = f.toString().split('\n');
        var json = [];
        for (var i = 0; i<array.length; i++){
            var object = {
                lat: array[i].split(" ")[0] === undefined ? "" : array[i].split(" ")[0].trim(),
                long: array[i].split(" ")[1] === undefined ? "" : array[i].split(" ")[1].trim()
            };
            json.push(object);
        }
        res.json(json);
    });
});

app.get('/existing_charging_stations', function (req, res) {
// app.get('/', function (req, res) {
    fs.readFile('./assets/data/existing_charging_stations.txt', function(err, f){
        var array = f.toString().split('\n');
        var json = [];
        for (var i = 0; i<array.length; i++){
            var object = {
                lat: array[i].split(" ")[0] === undefined ? "" : array[i].split(" ")[0].trim(),
                long: array[i].split(" ")[1] === undefined ? "" : array[i].split(" ")[1].trim()
            };
            json.push(object);
        }
        res.json(json);
    });
});

//POST & PUT data


//Server
app.listen(PORT, function () {
    console.log('Rest service running at port ' + PORT + ".");
});
