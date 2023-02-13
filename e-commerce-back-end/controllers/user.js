const User = require('../models/User')
const {asyncWrapper} = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const CryptoJS = require('crypto-js')
require('dotenv').config()


const secret = process.env.PASS_SEC
const secretKey = process.env.JWT_SEC
const updateUser = asyncWrapper(async (req, res, next) =>{
   if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, secret).toString()
   }
   const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body
   }, {new:true})
   res.status(200).json({updatedUser})
})

const deleteUser = asyncWrapper(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted')
})

const adminFindUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    const {...others} = user._doc;
    res.status(200).json(others)
    res.status(200).json('User has been deleted')
})

module.exports = {
    updateUser,
    deleteUser,
    adminFindUser
}