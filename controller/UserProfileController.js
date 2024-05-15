const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/UserProfile");

const registerUserProfile = async(req,res)=>{
    const {username,hash_password,email,phone_no,fullName,role,confirm_password} = req.body
        if (!username || !email || !phone_no || !hash_password ||  !confirm_password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide required information" })
        }
        const password = await bcrypt.hash(hash_password,10)
        const userProfileData = {username,password,email,phone_no,fullName,role}
        const user = await User.findOne({phone_no})
        if(user){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"User already exist"})
        }
        if (hash_password == confirm_password) {
            User.create(userProfileData).then((data, err) => {
                if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
                else {
                    return res.status(StatusCodes.CREATED).json({ message: "User created Successfully",data:data });
                }
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ err: "Please match the password" });
        }
}

const loginUserProfile = async(req,res)=>{
    const {phone_no,password,role} = req.body
    try{
        const user = await User.findOne({phone_no})
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch && user.role==role){
                const token = jwt.sign({ _id: user._id, }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                const userdata = await User.updateOne({ _id: user._id }, { $set: { token: token }})
                res.status(StatusCodes.OK).json({message:"User login successfully",token :token})
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"Password didn't match or role is not correct"})
            }
            }
        }
    catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Something Error to login"})
    }
}

const logoutUserProfile = async(req,res)=>{
    const {phone_no}=req.body
    try{
        const user = await User.findOne({phone_no})
        const token = user.token
    if (token) {
        const data = await User.updateOne({ phone_no: user.phone_no },
            {
                $set: { token: "" }
            })
        res.status(StatusCodes.OK).json({message:"User logout successfully"})
    }
    else{
        res.status(StatusCodes.OK).json({message:"User already logout"})
    }
    }catch{
        res.status(StatusCodes.BAD_REQUEST).json({message:"Something Error"})
    }
}

const updateUser = async(req,res)=>{
    const id = req.params.id
    const {email,username,fullName}  = req.body
    // const currentUser = req.user
try{
    const user = await User.findById(id)
    // const updateData = {email,username,password,fullName,phone_no}
    if (user.token){
        const updateData = { email, username, fullName  };
        const updatedUser = await User.updateOne({ _id: id }, { $set: updateData });
        if (updatedUser.modifiedCount > 0) {
            res.status(StatusCodes.OK).json({ message: "User updated successfully", data: updatedUser });
        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "Error updating user" });
        }
    } }catch (error) {
        console.error("Error updating user:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
    // }catch(error){
    //     res.status(StatusCodes.BAD_REQUEST).json({message:"Something Error"})
    // }
}

const deleteUser = async(req,res)=>{
    const id = req.params.id
    try {
            const deletedUser = await User.findByIdAndDelete(id)
            if (deletedUser){
                return res.status(StatusCodes.OK).json({message:"User deleted Successfully"})
            }
            else{
                res.status(StatusCodes.FORBIDDEN).json({message:"Error deleting User"})
            }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
    }

const addUserByAdmin = async(req,res)=>{
    const {email,username,phone_no,hash_password,confirm_password,fullName} = req.body
    if (!username || !email || !phone_no || !hash_password ||  !confirm_password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide required information" })
    }
    const password = await bcrypt.hash(hash_password,10)
    const userProfileData = {username,password,email,phone_no,fullName}
    const user = await User.findOne({phone_no})
    if(user){
        return res.status(StatusCodes.BAD_REQUEST).json({message:"User already exist"})
    }
    if (hash_password == confirm_password) {
        User.create(userProfileData).then((data, err) => {
            if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
            else {
                return res.status(StatusCodes.CREATED).json({ message: "User created Successfully",data:data });
            }
        });
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ err: "Please match the password" });
    }
    // try {
    //     const newUser = await User.create({email,username,phone_no,password,fullName})
    //     if (newUser){
    //         res.status(StatusCodes.OK).json({message:"User created successfully",data:newUser})
    //     }
    //     else{
    //         res.status(StatusCodes.FORBIDDEN).json({message:"Error creating user",data:newUser})
    //     }
    // } catch (error) {
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    // }
}
module.exports = {
    registerUserProfile,
    loginUserProfile,
    logoutUserProfile,
    updateUser,
    deleteUser,
    addUserByAdmin
};