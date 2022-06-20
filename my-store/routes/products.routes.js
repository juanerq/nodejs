import express from 'express'
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js'

import {
  createProductSchema,
  getProductSchema,
  idRequiredSchema,
  updatedProductSchema
} from '../schemas/product.schema.js'
import validatorHandler from '../middlewares/validator.handler.js'

const router = express.Router()

router.route('/')
  .post(
    validatorHandler(createProductSchema, 'body'),
    createProduct
  )

router.route('/:id?')
  .get(
    validatorHandler(getProductSchema, 'params'),
    listProducts
  )

router.route('/:id')
  .delete(
    validatorHandler(idRequiredSchema, 'params'),
    deleteProduct
  )
  .put(
    validatorHandler(idRequiredSchema, 'params'),
    validatorHandler(updatedProductSchema, 'body'),
    updateProduct
  )

export default router
