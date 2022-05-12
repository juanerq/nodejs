const router = require('express').Router()

const { createProduct, 
        getProducts, 
        getProductById, 
        updateProduct, 
        deleteProduct } = require('../controllers/products.controller')
        
const { validateCreateProduct, 
        validateReqGet, 
        validateGetProductById, 
        validateUpdateProduct,
        validateDeleteCategory } = require('../validators/product')

router.route('/')
  .get( validateReqGet, getProducts )
  .post( validateCreateProduct, createProduct )

router.route('/:id')
  .get( validateGetProductById, getProductById )
  .put( validateUpdateProduct, updateProduct )
  .delete( validateDeleteCategory, deleteProduct )


module.exports = router