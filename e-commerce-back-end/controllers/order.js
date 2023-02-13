const Order = require('../models/Order')
const {asyncWrapper} = require('../middleware/async')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const createOrder = asyncWrapper(async (req,res) =>{
    const order = await Order.create({
        userId:req.body.userId,
        products:req.body.products,
        amount:req.body.amount,
        createdAt: new Date(),
        updatedAt: new Date()

    })
    res.status(201).json({order})
})

const findUserOrders = asyncWrapper(async (req,res) =>{
    const userId = req.params.userId
    const order = await Order.aggregate([
        {$match: {userId: userId}}
    ])

    if(!order){
        return next(createCustomError(`You don't have any orders`, 404))
    }
    res.status(201).json({order})
})

const updateOrder = asyncWrapper(async (req, res, next) =>{
    const{orderId:orderId, status:orderStatus} = req.params
    const data = req.body
    const order = await Order.findOneAndUpdate({_id: orderId}, {status: orderStatus},{
        new:true,
        runValidators:true,
        
    })
    if(!orderId){
        return next(createCustomError(`No Order with id: ${orderId}`, 404))
    }
    res.status(200).json({order})
})

const findAllOrders = asyncWrapper(async (req, res, next) => {
    const orders = await Order.find({})
    res.status(200).json({orders})
})

const getOrderById = asyncWrapper(async (req, res, next) =>{
    const orderId = req.params.orderId
    const order = await Order.aggregate([
        {$match: {_id: ObjectId(orderId)}}
    ])
    if(!order){
        return next(createCustomError(`No Order with id : ${orderId}`, 404))
    }
    res.status(201).json({order})
})
module.exports = {
    createOrder,
    findUserOrders,
    updateOrder,
    findAllOrders,
    getOrderById
}