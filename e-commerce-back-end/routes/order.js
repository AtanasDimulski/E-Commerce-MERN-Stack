const express = require('express')
const orderRouter = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')
const {
    createOrder,
    findUserOrders,
    updateOrder,
    findAllOrders,
    getOrderById
} = require('../controllers/order')

orderRouter.post('/', verifyTokenAndAuthorization, createOrder)
orderRouter.get('/:userId',  verifyTokenAndAuthorization, findUserOrders)
orderRouter.patch('/updateOrder/:orderId/:status', verifyTokenAndAdmin, updateOrder)
orderRouter.get('/find/allOrders', verifyTokenAndAdmin, findAllOrders)
orderRouter.get('/getSingleOrder/:orderId', verifyTokenAndAdmin, getOrderById)
module.exports = orderRouter