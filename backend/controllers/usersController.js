const Users = require("../models/userModel");

const createUser = async(req,res)=>{
    const { email, password, role } = req.body
    const user = await Users.create({email,password,role}).catch(e=>console.log(e))
    res.status(200).json(user)
}

const getUser = async(req,res)=>{
    const { id } = req.params
    const user = await Users.findOne({_id:id}).catch(e=>console.log(e))
    res.status(200).json(user)
}

const signIn = async(req,res)=>{
    const { email, password } = req.body
    const user = await Users.findOne({email,password}).catch(e=>e)
    if(user){
        req.session.loggedin = true;
        req.session.username = user._id;
        res.status(200).json({id:user._id})
    }else{
        res.status(401).json({error:"sorry no user was found"})
    }
    
}
const signUp = async(req,res)=>{
    const { email, password } = req.body
    const user = await Users.create({email,password}).catch(e=>e)
    if(user.code===11000){
        res.status(401).json({error:'user already exisit'})
    }
    if(user){
        req.session.loggedin = true;
        req.session.username = user._id;
        res.status(200).json({id:user._id})
    }else{
        res.status(200).json({error:user.errors})
    }
}


module.exports = { createUser, signIn, getUser,signUp }