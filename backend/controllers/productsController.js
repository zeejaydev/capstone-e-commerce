const Product = require("../models/product");

const getProducts = async (req,res)=>{
    const prods = await Product.find()
    console.log(prods)
    res.status(200).json(prods)
}
module.exports = {getProducts}