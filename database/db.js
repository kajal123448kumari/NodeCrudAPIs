const mongoose = require('mongoose')

// const dbUrl = "mongodb+srv://kajal:kajal2345@cluster0.8gdjnqb.mongodb.net/?retryWrites=true&w=majority"
const url = "mongodb+srv://kajal:kajal2345@cluster0.8gdjnqb.mongodb.net/?retryWrites=true&w=majority"
// const dbUrl = "mongodb+srv://kajalkumari:kajal1234@cluster0.hm0y3xp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connection = mongoose.connect(url).then(()=>{
    console.log("Connection successful with MongoDB")
}).catch((error)=>{
    console.log("Connection Failed",error)
})

module.exports = connection;