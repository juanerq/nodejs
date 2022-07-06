import express from 'express'
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'

import { filterProductsSchema, idRequiredSchema } from '../schemas/list.schema.js'
import { userExists, categoryExists } from '../helpers/db.validators.js'
import { createProductSchema, updatedProductSchema } from '../schemas/product.schema.js'
import validatorHandler from '../middlewares/validator.handler.js'

const router = express.Router()

router.route('/')
  .post(validatorHandler(createProductSchema), userExists, categoryExists, createProduct)

router.route('/:id?')
  .get(validatorHandler(filterProductsSchema), listProducts)

router.route('/:id')
  .delete(validatorHandler(idRequiredSchema), deleteProduct)
  .put(validatorHandler(updatedProductSchema), userExists, categoryExists, updateProduct)

export default router
