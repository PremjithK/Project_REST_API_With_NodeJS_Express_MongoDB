const mongoose = require('mongoose')

// Creating a mongoDB Schema for Users
const CartSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
    }

})

module.exports = mongoose.model('users', UserSchema)