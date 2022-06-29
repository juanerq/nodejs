const express = require('express')
const { listProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller.js')

const { filterSchema, idRequiredSchema } = require('../schemas/list.schema.js')
const { createProductSchema, updatedProductSchema } = require('../schemas/product.schema.js')
const validatorHandler = require('../middlewares/validator.handler.js')

const router = express.Router()

router.route('/')
  .post(validatorHandler(createProductSchema), createProduct)

router.route('/:id?')
  .get(validatorHandler(filterSchema), listProducts)

router.route('/:id')
  .delete(validatorHandler(idRequiredSchema), deleteProduct)
  .put(validatorHandler(updatedProductSchema), updateProduct)

module.exports = router
