const Users = require("../models/userModel");

const isAdmin = async (req,res,next)=>{
    const id = req.session.username
    const user = await Users.findOne({_id:id})
	if(user){
        if(user.role === "admin"){
            next()
        }else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
}

module.exports = { isAdmin }