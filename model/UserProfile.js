const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userProfileSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password:
    {
        type: String,
        require: true
    },
    fullName: String,
    phone_no: {
        type: Number,
        require: true,
        unique:true
    },
    email: {
        type:String,
        require: true
    },
    role : {
        type:String,
        default:"user",
        enum :["user","admin"]
    },
    token: String
})

const UserProfile = mongoose.model('UserProfile', userProfileSchema)

module.exports = UserProfile;