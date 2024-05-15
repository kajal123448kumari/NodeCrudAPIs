const express = require('express')
const app = express()
const path = require("path")
const dotenv = require('dotenv').config();
const db = require('./database/db')
const port = process.env.PORT||6000;
var cors = require("cors");
// Routes
const userRoutes = require('./router/userRouter')
const studentRoutes = require('./router/auth')
const userprofileRoutes = require('./router/userProfileRouter')
const imageRoutes = require("./router/imageRouter")
const pdfRoutes = require("./router/pdfRouter")
const customRoutes = require("./router/customization")

// middlewares
app.use(cors());
app.use(express.json())
app.use(express.static('uploads'))
app.use(express.static('pdf'))
// middleware Routes
app.use(userRoutes)
app.use(studentRoutes)
app.use(userprofileRoutes)
app.use(imageRoutes)
app.use(pdfRoutes)
app.use(customRoutes)

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile)

app.get(`/views`, (req, res) => { 
    res.render(__dirname + "/views/reset.html",{ port :port}); 
});

app.get('/',(req,res)=>{
    res.send('Hello world! from API')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
