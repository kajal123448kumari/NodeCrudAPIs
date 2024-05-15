const {check, validationResult} = require('express-validator')
const {StatusCodes} = require('http-status-codes')

const validationRegister = [
    check("username").notEmpty().withMessage("Usename is required"),
    check("email").notEmpty().withMessage("Email is required"),
    check("phone_no").notEmpty().withMessage("Phone_no is required"),
    check("hash_password").isLength({min:8}).notEmpty().withMessage("Password must be at least 8 characters")
]

const validationLogin = [
    check("phone_no").notEmpty().withMessage("Phone_no is required"),
    check("password").isLength({min:8}).notEmpty().withMessage("Password must be at least 8 characters")
]

const isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req)
    if (errors.array().length>0){
        return res.status(StatusCodes.BAD_REQUEST).json({error:errors})
    }
    
    next();
};

module.exports = {
    validationRegister,
    validationLogin,
    isRequestValidated
}