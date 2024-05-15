const express = require("express")
const router = express.Router()
const {textPdf} = require("../controller/pdfController")

router.post('/pdfConvert',textPdf)

module.exports = router;