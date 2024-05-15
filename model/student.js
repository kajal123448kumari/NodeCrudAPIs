const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
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
    token:String
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student;