import * as express from 'express';
import Car from '../model/car';

let router = express.Router();

router.get('/', (req, res) => {
  Car.find().then((foundCars) => {
    res.status(200).json(foundCars);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.get('/:make', (req, res, next) => {
  let make = req.params['make'];
  let query = { make: make };
  Car.find(query).then((foundCars) => {
    if (foundCars.length > 0) {
      res.status(200).json(foundCars);
    } else { next() };
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.get('/:carModel', (req, res, next) => {
  let carModel = req.params['carModel'];
  let query = { carModel: carModel };
  Car.find(query).then((foundCars) => {
    if (foundCars.length > 0) {
      res.status(200).json(foundCars);
    } else { next() };
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params['id'];
  let query = { _id: id };
  Car.findOne(query).then((foundCars) => {
    res.status(200).json(foundCars);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params['id'];
  let query = { _id: id };
  Car.remove(query).then((deletedCars) => {
    res.status(200).json(deletedCars);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.post('/', (req, res) => {
  let car = new Car();

  car.make = req.body.make;
  car.carModel = req.body.carModel;
  car.year = req.body.year;

  car.save().then((newCar) => {
    res.status(200).json(newCar);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.put('/:id', (req, res) => {
  let id = req.params['id'];
  let query = { _id: id };
  Car.findOne(query).then((foundCar) => {
    if (!foundCar) {
      let car = new Car();

      car.make      = req.body.make;
      car.carModel  = req.body.carModel;
      car.year      = req.body.year;

      car.save().then((newCar) => {
        res.status(200).json(newCar);
      }).catch((err) => {
        console.log('Failed to create new car');
        res.status(404).json(err);
      });
    } else {
      foundCar.make      = req.body.make;
      foundCar.carModel  = req.body.carModel;
      foundCar.year      = req.body.year;

      foundCar.save().then((newCar) => {
        res.status(200).json(newCar);
      }).catch((err) => {
        console.log('Failed to update ' + car);
        res.status(404).json(err);
      });
    }).catch((err) => {
      console.log('Failed to create new document');
      res.status(404).json(err);
    });
});

export default router;
