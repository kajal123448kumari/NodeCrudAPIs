const { StatusCodes } = require("http-status-codes")
const User = require("../model/UserProfile")
const jwt = require("jsonwebtoken")

const isAuthorize = async (req, res, next) => {
    const token = req.header("x-access-token")
    if (!token) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Token is missing" })
    }
    const user = await User.findOne({ token: token })
    if (user) {
        try { 
            const tokenDetails = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = tokenDetails
            next();
        } catch (error) {
            // Access Denied
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Token" })
        }
    }
    else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" })
    }
}

const isAdmin = async(req, res, next) => {
    const currentUser = req.user
    const id = currentUser._id
    const user = await User.findById(id)
    if (user.role == "admin") {
        next()
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "UnAuthorized Admin User" })
    }
}

const isUser = async (req, res, next) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (user.role == "user" && user._id == id) {   
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "UnAuthorized User" })
    }
}

module.exports = { isAuthorize, isAdmin, isUser }