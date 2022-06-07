const Product = require("../models/productModel");

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
const createItem = async (req,res)=>{
    const { title, price, categorie, image,desc } = req.body

    const prodsId = await Product.find()
    const id = prodsId.length + 1
    const prods = await Product.create({title,price,categorie,image,_id:id,desc})
    res.status(200).json(prods)
}
const deleteItem = async (req,res)=>{
    const { id } = req.params

    const item = await Product.findByIdAndRemove(id)
    res.status(200).json(item)
}
module.exports = { getProducts, sortProducts, getItem, createItem, deleteItem }