const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    carId: {
        type: {},
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Car', carSchema);