"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var car_1 = require("../model/car");
var router = express.Router();
router.get('/', function (req, res) {
    car_1.default.find().then(function (foundCars) {
        res.status(200).json(foundCars);
    }).catch(function (err) {
        res.status(404).json(err);
    });
});
router.get('/:make', function (req, res, next) {
    var make = req.params['make'];
    var query = { make: make };
    car_1.default.find(query).then(function (foundCars) {
        if (foundCars.length > 0) {
            res.status(200).json(foundCars);
        }
        else {
            next();
        }
        ;
    }).catch(function (err) {
        res.status(404).json(err);
    });
});
router.get('/:carModel', function (req, res, next) {
    var carModel = req.params['carModel'];
    var query = { carModel: carModel };
    car_1.default.find(query).then(function (foundCars) {
        if (foundCars.length > 0) {
            res.status(200).json(foundCars);
        }
        else {
            next();
        }
        ;
    }).catch(function (err) {
        res.status(404).json(err);
    });
});
router.get('/:id', function (req, res) {
    var id = req.params['id'];
    var query = { _id: id };
    car_1.default.findOne(query).then(function (foundCars) {
        res.status(200).json(foundCars);
    }).catch(function (err) {
        res.status(404).json(err);
    });
});
router.delete('/:id', function (req, res) {
    var id = req.params['id'];
    var query = { _id: id };
    car_1.default.remove(query).then(function (deletedCars) {
        res.status(200).json(deletedCars);
    }).catch(function (err) {
        res.status(404).json(err);
    });
});
router.post('/', function (req, res) {
    var car = new car_1.default();
    car.make = req.body.make;
    car.carModel = req.body.carModel;
    car.year = req.body.year;
    car.save().then(function (newCar) {
        res.status(200).json(newCar);
    }).catch(function (err) {
        res.status(404).json(err);
    });
});
router.put('/:id', function (req, res) {
    var id = req.params['id'];
    var query = { _id: id };
    car_1.default.findOne(query).then(function (foundCar) {
        if (!foundCar) {
            var car = new car_1.default();
            car.make = req.body.make;
            car.carModel = req.body.carModel;
            car.year = req.body.year;
            car.save().then(function (newCar) {
                res.status(200).json(newCar);
            }).catch(function (err) {
                console.log('Failed to create new car');
                res.status(404).json(err);
            });
        }
        else {
            foundCar.make = req.body.make;
            foundCar.carModel = req.body.carModel;
            foundCar.year = req.body.year;
            foundCar.save().then(function (newCar) {
                res.status(200).json(newCar);
            }).catch(function (err) {
                console.log('Failed to update ' + car);
                res.status(404).json(err);
            });
        }
    }).catch(function (err) {
        console.log('Failed to create new document');
        res.status(404).json(err);
    });
});
exports.default = router;
