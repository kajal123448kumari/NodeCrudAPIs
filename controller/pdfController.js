const Pdf = require("../model/pdf")
const PDFDocument = require('pdfkit');
const fs = require('fs');


const textPdf = async (req, res) => {
    const { content } = req.body
    try {
        const doc = new PDFDocument();
        const pdfPath = `pdf/${Date.now()}.pdf`
        doc.pipe(fs.createWriteStream(pdfPath))
        doc.text(content)
        doc.end();
        const data = {
            text: content,
            url: pdfPath
        }
        if (data){
        const newText = await Pdf.create(data)
        res.status(200).json({ message: "Text coverted successfully", data: newText })
        }else{
            res.status(200).json({ message: "Error coverting Text into pdf"})
        }
    } catch (error) {
        res.status(500).json({ message: "Something Error" })
    }
}

module.exports = { textPdf };