const mongoose = require('mongoose');

const products = mongoose.Schema(
    {
        _id: Number,
        title: String,
        img: String,
        desc: String
    }
)
module.exports = mongoose.model('products', products);