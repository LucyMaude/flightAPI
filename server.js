var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var flightRouter = express.Router();

var Flights = require("./flights");

var port = 3000;

app.use(bodyParser.json());

flightRouter.route("/flights")
    .get(function (req, res) {
        res.send(Flights);
    })

flightRouter.route("/flights/arrivals")
    .get(function (req, res) {
     var results = [];
     for (var i = 0; i < Flights.length; i++){
         if (Flights[i].ArrDep === "A"){
             results.push(Flights[i]);
         }
     }
    res.send(results);
    });

flightRouter.route("/flights/departures")
    .get(function (req, res) {
     var results = [];
     for (var i = 0; i < Flights.length; i++){
         if (Flights[i].ArrDep === "D"){
             results.push(Flights[i]);
         }
     }
    res.send(results);
    })

flightRouter.route("/flights/flight/:flightNo")
    .get(function (req, res) {
                for (var i = 0; i < Flights.length; i++) {
                    if (Flights[i].FlightNo === req.params.flightNo) {
                        res.send(Flights[i]);
                    }
                }
    });
app.use("/", flightRouter);
app.listen(port, function () {
    console.log(`listening on port ${port}`);
})
