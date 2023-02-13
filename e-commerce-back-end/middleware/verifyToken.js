require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SEC

const verifyToken =(req, res, next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, secretKey, (err, data) =>{
            if(err){
                res.status(403).json('Token is not valid!')
            }else{
                req.user = data
                next()
            }
        })
    }else {
        return res.status(401).json('You are not authenticated')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.user.id === req.body.userId || req.user.id === req.params.userId || req.user.isAdmin === true){           
            next()
        }else{
            res.status(403).json('You can not perform this action!')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.user.isAdmin){           
            next()
        }else{
            res.status(403).json('You are not admin')
        }
    })
}
module.exports = {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}