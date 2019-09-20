const express = require('express');
const carRouter = express.Router();

// Car Schema
const Car = require('../models/model');

const Joi = require('joi');
const uuidv4 = require('uuid');

// Get all cars
carRouter.get('/car', (req, res) => {

    Car.find()
    .then( cars => {
        res.send(cars)
    })
    .catch( err => {
        res.status(500).send({
            message: err.message || "Kapputz"
        });
    });
   
});

// Get one car
carRouter.get('/car/:id', (req, res) => {
    const id = req.params.id
    Car.findById(id)
    .then( car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with carId " + id
            });
        }

        res.send(car)
    })
    .catch(err => {
        if(err.kind === 'Object'){
            return res.status(404).send({
                message: "Car not found with carId " + id
            });
        }

        return res.status(500).send({
            message: "Something went wrong with retrieving Car with carId " + id
        });
    });
    
});

// Create car
carRouter.post('/car', (req, res) => {

    if (!req.body){
        return res.status(400).send({
            message: "Car content can't be empty."
        })
    }
    
    let car = new Car({
        carId: uuidv4(),
        make: req.body.make,
        model: req.body.model,
        status: req.body.status,
        owner: req.body.owner
    });

    car.save()
        .then( data => {
            res.send(data)
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error while creating product."
            });
        });
    
});

// Update one car
carRouter.put('/car/:id', async (req, res) => {

    const id = req.params.id;

    if(!req.body){
        return res.status(400).send({
            message: "Request content cannot be empty"
        });
    }

    Car.findByIdAndUpdate(id, {
        status: req.body.status
    }, { new: true})
    .then( car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id" + id
            })
        }

        res.send(car)

    })
    .catch( err => {
        return res.status(500).send(err);
    })

});

// Delete a car
carRouter.delete('/car/:id', (req, res) => {
    const id = req.params.id
    Car.findByIdAndRemove(id)
    .then( car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with Id " + carId
            });   
        }

        res.send({
            message: "Car deleted successfully."
        });
    })
    .catch( err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Car not found with Id " + carId
            });
        }

        return res.status(500).send({
            message: "Could not delete car with Id " + carId
        });
    });
});

module.exports = carRouter;