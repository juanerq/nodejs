import express from 'express'
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'

import { filterSchema, idRequiredSchema } from '../schemas/list.schema.js'
import { createProductSchema, updatedProductSchema } from '../schemas/product.schema.js'
import validatorHandler from '../middlewares/validator.handler.js'

const router = express.Router()

router.route('/')
  .post(validatorHandler(createProductSchema), createProduct)

router.route('/:id?')
  .get(validatorHandler(filterSchema), listProducts)

router.route('/:id')
  .delete(validatorHandler(idRequiredSchema), deleteProduct)
  .put(validatorHandler(updatedProductSchema), updateProduct)

export default router
