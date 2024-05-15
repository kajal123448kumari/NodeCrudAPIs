const mongoose = require("mongoose")

const pdfSchema = mongoose.Schema({
    text:{
        type:String
    },
    url :{
        type:String,
        require:true
    }
})

const Pdf = mongoose.model('Pdf',pdfSchema)

module.exports = Pdf