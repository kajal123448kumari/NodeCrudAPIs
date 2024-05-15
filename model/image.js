const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
    name: {
        type: [],
        require: true
    },
    url: {
        type: [],
        require: true
    }
})

const Image = mongoose.model('Image',imageSchema)
module.exports = Image;