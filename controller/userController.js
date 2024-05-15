const User = require('../model/userTable')

const addUser = async (req, res) => {
    const { username, password, fullName, age, email } = req.body;
    try {
        const newUser = await User.create({ username, password, fullName, age, email })
        if (newUser) {
            res.status(201).send(newUser)
        }
        else {
            res.status(400).json({ message: 'User not Created' })
        }
    } catch {
        return res.status(500).json({ error: 'Error creating User' })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.status(200).send(users)
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    } catch {
        res.status(500).json({ error: 'Error getting users' })
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body)
        if (updatedUser) {
            res.status(200).send(updatedUser)
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        if (deleteUser) {
            res.status(200).json({ message: 'User deleted successfully' })
        } else {
            res.status(400).json({ message: 'User not found' })
        }
    } catch {
        res.status(500).json({ error: 'User not deleted' })
    }
}

const getUserByUsername = async (req, res) => {
    const username = req.params.username
    try {
        const user = await User.find({ username: username })
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    } catch {
        res.status(500).json({ error: 'Error getting users' })
    }
}

const updateUserByUsername = async (req, res) => {
    const username = req.params.username
    try {
        const user = await User.updateOne({ username: username },
            { $set: req.body })
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    } catch {
        res.status(500).json({ error: 'Error updating users' })
    }
}

const deleteUserByUsername = async (req, res) => {
    const username = req.params.username
    console.log(username)
    try {
        const user = await User.findOneAndDelete({ username: username })
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' })
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }

    } catch {
        res.status(500).json({ error: 'Error deleting users' })
    }
}

const crudOperation = async (req, res) => {
    const condition = req.body.condition
    const data = req.body
    const { username, password, fullName, age, email } = req.body;
    if (condition == "c") {
        const newUser = await User.create({ username, password, fullName, age, email })
        if (newUser) {
            res.status(201).send(newUser)
        }
        else {
            res.status(400).json({ message: 'User not Created' })
        }

    }
    else if (condition == "r") {
        const users = await User.find()
        if (users) {
            res.status(200).send(users)
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    }
    else if (condition == "u") {
        const updatedUser = await User.findByIdAndUpdate(data.id, data)
        console.log("kashkx", data.id)
        if (updatedUser) {
            res.status(200).json({ message: updatedUser })
        }
        else {
            res.status(400).json({ message: 'User not found' })
        }
    }
    else if (condition == "d") {
        const deleteUser = await User.findByIdAndDelete(data.id)
        if (deleteUser) {
            res.status(200).json({ message: 'User deleted successfully' })
        } else {
            res.status(400).json({ message: 'User not found' })
        }
    }
    else {
        res.status(500).json({ error: "Can't perform crud operation" })
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByUsername,
    updateUserByUsername,
    deleteUserByUsername,
    crudOperation
};