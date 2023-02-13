const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'You have to provide a name'],
        trim:true,
        maxlength:[20, 'Name can not be longer than 20 characters']
    },
    price: {
        type:mongoose.Types.Decimal128
    },
    attributes: [{
        color: {type:String, required:true},
        mainImageUrl: {type:String, required:true},
        secondaryImages:[{
            type:String
        }],
        sizes:[{
            value:{type:String, required:true},
            quantity:Number
        }],
        createdAt:Date,
        updatedAt:Date
    }],
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    subSubCategory:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Product', ProductSchema)