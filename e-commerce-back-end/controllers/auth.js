const User = require('../models/User')
const {asyncWrapper} = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const CryptoJS = require('crypto-js')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret = process.env.PASS_SEC
const secretKey = process.env.JWT_SEC
const registerUser = asyncWrapper(async (req, res, next) =>{
    const user = await User.create({
        userName: req.body.userName,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, secret).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.status(201).json({user})
})

const loginUser = asyncWrapper(async (req, res, next) =>{
    const user = await User.findOne({
        userName: req.body.userName
    })
    const hashedPassword = CryptoJS.AES.decrypt(user.password, secret)
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    const{password, ...others} = user._doc;
    if(!user){
        res.status(401).json("Wrong crendentials")
    }else if(originalPassword !== req.body.password){
        res.status(401).json("Wrong credentials")
    }else{
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, secretKey,
        {expiresIn:'3d'})
        res.status(200).json({...others, accessToken})
    }
    
})

module.exports = {
    registerUser,
    loginUser
}