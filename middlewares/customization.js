const User = require("../model/userTable")

const crudData = async (req, res, next) => {
    try {
        const data = {
            username: "Kajal168742",
            email: "k@gmail.com",
            age: 22,
            password: "kajal@23456",
            fullName: "Kajal Kumari"
        }
        const newUser = await User.create(data)
        console.log(newUser)
        if (newUser) {
            next();
        } else {
            res.status(400).json({ message: "Error creating user" })
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const readData = async(req,res,next)=>{
    try {
        const user = await User.find({username : "Kajal112"})
        if (user){
            req.user = user
            next();
        }
        else{
            res.status(400).json({ message: "Error getting user" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateData = async(req,res,next)=>{
    const data ={
        email:"ka@gmail.com",
        fullName:"Mukesh tiwari",
        password :"kajal@123",
        age : 12
    }
    try {
        const user = await User.updateOne({username:"Kajal168742"},{$set :data})
        if (user){
            req.user = user
            next();
        }
        else{
            res.status(400).json({ message: "Error updating user" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const deleteData = async(req,res,next)=>{
    try {
        // cosnole.log("sxnkjs")
        const user = await User.findOneAndDelete({username : "Kajal12"})
        if (user){
            req.user = user
            next();
        }
        else{
            res.status(400).json({ message: "Error deleting user" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}


module.exports = { crudData ,readData,updateData,deleteData};
