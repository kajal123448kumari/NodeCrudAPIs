
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const Student = require("../model/student")

const validateToken = async(req, res, next) => {
    // Extract the token from the authorization header
    const token = req.header("x-access-token")
    if (!token){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Token is missing"})
    }
    const student = await Student.findOne({token:token})
    if(student){  
    try{
    const tokenDetails = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    req.user = tokenDetails
    next();
} catch (error) {
    // Access Denied
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid Token"})
}}
else{
    return res.status(StatusCodes.BAD_REQUEST).json({message:"Student not found"})
}
}

module.exports = { validateToken };
