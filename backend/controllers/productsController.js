const Product = require("../models/product");

const getProducts = async (req,res)=>{
    const prods = await Product.find()
    res.status(200).json(prods)
}
const sortProducts = async (req,res)=>{
    const { sort } = req.params
    const prods = await Product.aggregate([ { $match : { categorie : sort } } ])
    res.status(200).json(prods)
}
const getItem = async (req,res)=>{
    const { id } = req.params
    const prods = await Product.aggregate([ { $match : { _id:+id } } ])
    res.status(200).json(prods)
}
module.exports = {getProducts,sortProducts,getItem}