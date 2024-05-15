const userRouter = require('../controller/userController')
const express = require('express')
const router = express.Router()

router.post('/postUser',userRouter.addUser)
router.get('/getAllUsers',userRouter.getAllUsers)
// User by Id
router.get('/getUserById/:id',userRouter.getUserById)
router.put('/putUser/:id',userRouter.updateUser)
router.delete('/deleteUser/:id',userRouter.deleteUser)
// User by username
router.get('/getUser/:username',userRouter.getUserByUsername)
router.put('/putUserByUsername/:username',userRouter.updateUserByUsername)
router.delete('/deleteUserByUsername/:username',userRouter.deleteUserByUsername)
// Crud Operation
router.post('/crud',userRouter.crudOperation)

module.exports =router;


