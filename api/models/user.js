const mongoose = require('mongoose');
const { use } = require('../routes/orders');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('User', userSchema);