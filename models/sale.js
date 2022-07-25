const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    }, reservation: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'reservation'
    }, product: {
        type: String,
        required: true
    }, amount: {
        type: Number,
        required: true
    }, paid: {
        type: Boolean,
        required: true
    }, salesPerson: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model( 'Sale' , saleSchema );