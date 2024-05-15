const multer = require("multer")
const path = require("path")
// const upload = multer(
//     {dest : './uploads/'},
//     )
const express = require("express")
const router = express.Router()
const imageUpload = require("../controller/imageController")

const storage = multer.diskStorage({
    destination :"./uploads",
    filename : function(req,file,cb){
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})

router.post('/upload',upload.array('profile',10),imageUpload)

module.exports = router;
