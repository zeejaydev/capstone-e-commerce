const path = require("path");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const connectDB = require('./config/db');
const { getProducts } = require("./controllers/productsController");

connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.get('/api/allProducts',getProducts)


app.use(express.static(path.join(__dirname,"../client/build")));
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")));

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`server is running on ${port}`))