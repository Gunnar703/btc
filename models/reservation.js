const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, court: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Court'
    }, reservationDate: {
        type: Date,
        required: true
    }, startTime: {
        type: String,
        required: true
    }, endTime: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model( 'Reservation' , reservationSchema );