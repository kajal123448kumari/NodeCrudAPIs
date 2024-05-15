const express = require("express")
const router = express.Router()
const userprofile = require("../controller/UserProfileController")
const {isAuthorize,isAdmin,isUser} = require("../middlewares/userProfile")

router.post("/register-user",userprofile.registerUserProfile)
router.post("/login-user",userprofile.loginUserProfile)
router.post("/logout-user",userprofile.logoutUserProfile)
// For admin routes and protected
router.post("/admin/users",isAuthorize,isAdmin,userprofile.addUserByAdmin)
router.delete("/admin/users/:id",isAuthorize,isAdmin,userprofile.deleteUser)
router.post("/admin/users/:id",isAuthorize,isAdmin,userprofile.updateUser)
// For user routes
router.post("/users/:id",isAuthorize,isUser,userprofile.updateUser)
router.delete("/users/:id",isAuthorize,isUser,userprofile.deleteUser)

module.exports = router;