const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    
    type: {
        type: String,
        required: true,
        default: 'customer',
    },

})

module.exports = mongoose.model('user', UserSchema)