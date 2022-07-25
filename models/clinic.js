const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    dates: {
        type: Array,
        required: true
    }, unitPrice: {
        type: Number,
        required: true
    }, location: {
        type: String,
        required: true
    }, instructor: {
        type: String,
        required: true
    }, capacity: {
        type: Number,
        required: true
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model( 'Clinic' , clinicSchema );