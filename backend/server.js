const path = require("path");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const connectDB = require('./config/db');
const session = require('express-session');
const { getProducts,sortProducts,getItem } = require("./controllers/productsController");
const { createUser, signIn, getUser, signUp } = require("./controllers/usersController");
const { isAdmin } = require("./middlewares/isAdmin");

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
app.post('/api/register',createUser);
app.post('/api/signin',signIn);
app.post('/api/signup',signUp);
app.get('/api/getUser/:id',getUser);

app.use(express.static(path.join(__dirname,"../client/build")));
app.get('/admin',isAdmin,(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")));

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`server is running on ${port}`))