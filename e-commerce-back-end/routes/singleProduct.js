const express = require('express')
const routerSingleProduct = express.Router();
const {
    getProductById,
    getProductByIds,
    searchProductByName,

} = require('../controllers/products')

routerSingleProduct.get('/getProductById/:id', getProductById)
routerSingleProduct.get('/searchByVariant/:productId/:variantId', getProductByIds)
routerSingleProduct.get('/search/:name', searchProductByName)

module.exports = routerSingleProduct