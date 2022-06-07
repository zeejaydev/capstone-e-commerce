const mongoose = require('mongoose');

const products = mongoose.Schema(
    {
        _id: Number,
        title: String,
        image: String,
        desc: String,
        price:String,
        categorie: [String]
    }
)
module.exports = mongoose.model('products', products);