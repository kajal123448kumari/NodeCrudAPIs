const Image = require("../model/image")

const imageUpload = async (req, res) => {
    let url = [];
    let name = []
    let file_length = req.files.length
    if (req.files) {
       for (let i = 0; i < file_length; i++) {
        url[i] = `http://localhost:${process.env.port}/${req.files[i].filename}`
        name[i] = req.files[i].filename
        console.log(`http://localhost:${process.env.port}/${req.files[i].filename}`)
       }
        const data = {
            url: url,
            name: name
        }
        await Image.create(data)
    }
    else{
        res.json({message:"Please upload files"})
    }
    res.status(200).json({ success: true })
}

module.exports = imageUpload;