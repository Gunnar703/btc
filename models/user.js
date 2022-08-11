const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, userTypes: {
        type: Array,
        required: true
    }, accountBalance: {
        type: Number,
        required: true
    }
});

userSchema.post('findOneAndDelete', async (userDoc) => {
    console.log(`Deleted user record for user ${userDoc.name}`);
});

module.exports = mongoose.model( 'User' , userSchema );