const express = require('express')
const userRouter = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')

const {
    updateUser,
    deleteUser,
    adminFindUser
} = require('../controllers/user')

userRouter.put('/:id',verifyTokenAndAuthorization, updateUser)
userRouter.delete('/:id',verifyTokenAndAuthorization, deleteUser)
userRouter.get('/:id',verifyTokenAndAdmin, adminFindUser)

module.exports = userRouter