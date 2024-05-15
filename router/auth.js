const {signUp, signIn, signOut, forgotPassword,resetPassword,getAccessToken} = require("../controller/auth")
const express = require("express")
const router = express.Router()
const { isRequestValidated,validationRegister,validationLogin} = require("../validators/auth")
const { validateToken } = require("../middlewares/auth");

router.route("/signupStudent").post(validationRegister, isRequestValidated, signUp);
router.route("/signinStudent").post(validationLogin, isRequestValidated, signIn);
router.get("/getAccessToken", getAccessToken);
router.route("/signOutStudent").post(signOut);
router.route("/forgetPassword").post(forgotPassword);
router.route("/resetPassword").get(resetPassword);
router.get("/protected-route", validateToken,(req,res)=>{
    res.json({ message: 'Welcome to the protected route!', user: req.user });});
router.route("/getAccessToken").post(getAccessToken);

module.exports = router