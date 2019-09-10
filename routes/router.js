const express = require('express');
const router = express.Router();
const Car = require('../models/model');

const Joi = require('joi');

// Get all cars
router.get('/', (req, res) => {
    res.send('Welcome to CarMax API')
})

// Get one car
router.get('/:id', (req, res) => {

})

// Create car
router.post('/:id', (req, res) => {
    const schema = {
        owner: Joi.string().min(2).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error) {
        res.status(400).send(result.error)
    }
    
})

// Update one car
router.patch('/:id', (req, res) => {

})

// Delete a car
router.delete('/:id', (req, res) => {

})

module.exports = router;