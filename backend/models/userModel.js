const mongoose = require('mongoose');

const users = mongoose.Schema(
    {
        email: {
            type: String,
            required:[true,"Please add you email"],
            unique:[true,"User alreafy exisit"],
            dropDups:true
        },
        password: {
            type:String,
            required:[true,"Password is required"]
        },
        role: {
            type:String,
        },
    }
)
module.exports = mongoose.model('Users', users);