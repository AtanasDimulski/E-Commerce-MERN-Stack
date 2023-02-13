const express = require('express')
const router = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken')

const {
    getNewestProducts,
    getAllProductsByCategory,
    getAllProductsByCategoryAndSubCategory,
    getAllProductsByCategorySubCategoryAndSubSubCateogry,
    createProduct,
    deleteProduct,
    deleteVariant,
    createProductPhoto,
    createProductVariant,
    updateSizeQuantityCart,
    updateProductPhotosAndSizes

} = require('../controllers/products')

router.get('/newestProducts', getNewestProducts)
router.get('/:category', getAllProductsByCategory)
router.get('/:category/:subCategory', getAllProductsByCategoryAndSubCategory)
router.get('/:category/:subCategory/:subSubCategory', getAllProductsByCategorySubCategoryAndSubSubCateogry)
router.post('/', verifyTokenAndAdmin, createProduct)
router.patch('/:productId/:variantId', verifyTokenAndAdmin, deleteVariant)
router.delete('/:id', verifyTokenAndAdmin, deleteProduct)
router.post('/photo', verifyTokenAndAdmin, createProductPhoto)
router.post('/photo/:id', verifyTokenAndAdmin, createProductVariant)
router.post('/update/variant/photos', verifyTokenAndAdmin, updateProductPhotosAndSizes)
router.patch('/update/quantity/sizes', updateSizeQuantityCart)

module.exports = router