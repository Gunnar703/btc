const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, hourlyRate: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model( 'Court' , courtSchema );