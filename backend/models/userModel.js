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
            required:[true,"role is required"]
        },
    }
)
module.exports = mongoose.model('Users', users);