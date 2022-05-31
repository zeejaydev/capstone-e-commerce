const path = require("path");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const connectDB = require('./config/db');
const session = require('express-session');
const { getProducts,sortProducts,getItem } = require("./controllers/productsController");

connectDB()
const app = express();
app.use(session({
	secret: 'e-commerce-secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.get('/api/allProducts',getProducts);
app.get('/api/sortProducts/:sort',sortProducts);
app.get('/api/get/:id',getItem);

const isAuth = (req,res,next)=>{
	if(req.session.username){
		next()
	}else{
		res.redirect('/login')
	}
}

app.use(express.static(path.join(__dirname,"../client/build")));
app.get('/admin',isAuth,(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")));

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`server is running on ${port}`))