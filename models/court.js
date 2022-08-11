const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, regularRate: {
        type: Number,
        required: true
    }, primeRate: {
        type: Number,
        required: true
    }, surface: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model( 'Court' , courtSchema );