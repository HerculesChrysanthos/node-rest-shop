const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String, 
        required: true
        // minlength: 4
    },
    price: {
         type: Number, 
         required: true
        //  min: 0
        }
});

module.exports = mongoose.model('Product', productSchema);