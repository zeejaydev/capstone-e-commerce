const path = require("path");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const connectDB = require('./config/db');
const session = require('express-session');
const { getProducts,sortProducts,getItem, createItem, deleteItem } = require("./controllers/productsController");
const { createUser, signIn, getUser, signUp } = require("./controllers/usersController");
const { isAdmin } = require("./middlewares/isAdmin");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg'){
			cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
		}else if (file.mimetype === 'image/png'){
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}else{
			cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
		}
    }
})

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

const upload = multer({storage:storage});
app.post('/api/imageUpload', upload.single('file'), (req, res) => {
	if (!req.file) {
	  console.log("No file received");
	  return res.send({
		success: false
	  });
  
	} else {
	  console.log(req.file);
	  return res.send({
		url: req.file.filename
	  })
	}
  });
app.get('/api/allProducts',getProducts);
app.get('/api/sortProducts/:sort',sortProducts);
app.get('/api/get/:id',getItem);
app.post('/api/register',createUser);
app.post('/api/createItem',createItem);
app.delete('/api/deleteItem/:id',deleteItem);
app.post('/api/signin',signIn);
app.post('/api/signup',signUp);
app.get('/api/getUser/:id',getUser);

app.use(express.static(path.join(__dirname,"../client/build")));
app.get('/api/uploads/:name', (req, res) => {
	res.sendFile(path.join(__dirname,'../uploads/'+req.params.name));
});
app.get('/admin',isAdmin,(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,"../","client","build","index.html")));

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`server is running on ${port}`))