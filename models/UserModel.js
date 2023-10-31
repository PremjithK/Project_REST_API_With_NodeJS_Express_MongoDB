const mongoose = require('mongoose')

// Creating a mongoDB Schema for Users
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    
    type: {
        type: String,
        required: true,
        default: 'user',
    },

})

module.exports = mongoose.model('users', UserSchema)