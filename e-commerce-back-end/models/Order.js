const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
            productId:{
                type:String
            },
            productName:{
                type:String
            },
            productSize:{
                type:String
            },
            productColor:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    amount: {
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    createdAt:Date,
    updatedAt:Date
})

module.exports = mongoose.model('Order', OrderSchema)