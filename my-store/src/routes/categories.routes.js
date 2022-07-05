import express from 'express'
import { listCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controller.js'

import validatorHandler from '../middlewares/validator.handler.js'
import { userExists } from '../helpers/db.validators.js'
import { filterSchema, idRequiredSchema } from '../schemas/list.schema.js'
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema.js'

const router = express.Router()

router.route('/:id?')
  .get(validatorHandler(filterSchema), listCategories)

router.route('/')
  .post(validatorHandler(createCategorySchema), userExists, createCategory)

router.route('/:id')
  .put(validatorHandler(updateCategorySchema), updateCategory)
  .delete(validatorHandler(idRequiredSchema), deleteCategory)

export default router
