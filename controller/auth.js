const { StatusCodes } = require("http-status-codes");
const Student = require("../model/student")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validateToken } = require("../middlewares/auth");

const signUp = async (req, res) => {
    const { username, fullName, phone_no, email, hash_password, confirm_password } = req.body
    if (!username || !email || !phone_no || !hash_password || !confirm_password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide required information" })
    }
    const password = await bcrypt.hash(hash_password, 10)
    const studentData = {
        username, fullName, phone_no, email, password
    }
    const student = await Student.findOne({ phone_no })
    if (student) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Student already registered",
        });
    }
    else {
        if (hash_password == confirm_password) {
            Student.create(studentData).then((data, err) => {
                if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
                else {
                    res.status(StatusCodes.CREATED).json({ message: "Student created Successfully" });
                }
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ err: "Please match the password" });
        }
    }
}

const signIn = async (req, res) => {
    try {
        if (!req.body.phone_no || !req.body.password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide required credentials" })
        }
        const student = await Student.findOne({ phone_no: req.body.phone_no })
        const isMatch = await bcrypt.compare(req.body.password, student.password);
        if (isMatch) {
            const access_token = jwt.sign({ _id: student._id, }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            const refresh_token = jwt.sign({ _id: student._id, }, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });
            const { _id, username, fullName, email } = student;
            student.token = refresh_token
            student.save()
            const data = {refresh_token, access_token, user: { _id, username, fullName, email } }
            res.status(StatusCodes.OK).json(data)
        }
        else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please provide correct credentials" })
        }
    }
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong" });
    }
}

const getAccessToken = async(req,res)=>{
    try {
        const student = await Student.findOne({token:req.body.refresh_token})
       
        if (student){
            const access_token = jwt.sign({_id:student._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"})
            res.status(StatusCodes.OK).json({success:true,access_token:access_token})
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({messsage:"Student not found"})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({messsage:"Invalid Token"})
    }
}

const signOut = async (req, res) => {
    const phone_no = req.body.phone_no
    const student = await Student.findOne({ phone_no: phone_no })
    const token = student.token
    if (token) {
        const data = await Student.updateOne({ phone_no: student.phone_no },
            {
                $set: { token: "" }
            })
        res.status(StatusCodes.OK).json(data)
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong" });
    }
}

const resetPasswordRequest = async (fullName, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            UNAUTHORIZED: true,
            auth: {
                user: 'kajal2082909@gmail.com',
                pass: 'zviejezgcvmvclwv'
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Please reset your Password",
            html: `<h1> Hii ${fullName}</h1>Please copy the link and <a href = "http://localhost:${process.env.port}/views">reset the password</a>`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log("Mail has been sent", info.response)
                res.status(StatusCodes.OK).json({ message: "Message sent successfully" })
            }
        })
    } catch (error) {

    }

}

const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email
        const student = await Student.findOne({ email: email })
        if (!student) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Student doesn't exist" });
        }
        else {
            const token = jwt.sign({ _id: student._id, }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            const updateStudent = await Student.updateOne({ email: email },
                {
                    $set: { token: token }
                }, { new: true })
            if (token && email) {

                resetPasswordRequest(student.fullName, student.email, token)

                newToken = token

                res.status(StatusCodes.OK).json({ message: 'Please check your mail for reset password' })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'Something error' })
            }
            newToken = token
        }
    }
    catch {
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body
        const student = await Student.findOne({ email: email })
        if (student) {
            if (password == confirm_password) {
                const newPassword = await bcrypt.hash(password, 10)
                const updatestudent = await Student.updateOne({ email: student.email }, { $set: { password: newPassword } })

                res.status(StatusCodes.OK).json({ success: true, message: "Password has been reset successfuly", data: student })
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Password didn't match" })
            }
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "The link has been expired" })

        }
    } catch {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Something went wrong" })
    }
}


module.exports = {
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    getAccessToken

}