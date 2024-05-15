const express = require('express')
const router = express.Router()
const {crudData,readData,updateData,deleteData} = require("../middlewares/customization")

router.post('/create', crudData,(req,res)=>{
    res.status(200).json({message:"User created successfully"})
})

router.get('/read', readData,(req,res)=>{
    if (req.user){
    res.status(200).json({message:req.user})}
    else{
        res.status(200).json({message:"Error getting Users"})}
    }
)

router.put('/update', updateData,(req,res)=>{
    if (req.user){
    res.status(200).json({message:req.user})}
    else{
        res.status(200).json({message:"Error updating Users"})}
    }
)

router.delete('/delete', deleteData,(req,res)=>{
    if (req.user){
    res.status(200).json({message:"User deleted successfully"})}
    else{
        res.status(200).json({message:"Error deleting Users"})}
    }
)

module.exports = router;