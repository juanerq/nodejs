import express from 'express'
import { createCustomer, listCustomers, updateCustomer } from '../controllers/customer.controller.js'

import { filterSchema } from '../schemas/list.schema.js'
import { createCustomerSchema, updateCustomerSchema } from '../schemas/customer.schema.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { isRoleValid, userExists } from '../helpers/db.validators.js'

const router = express.Router()

router.route('/')
  .post(validatorHandler(createCustomerSchema), isRoleValid, createCustomer)

router.route('/:id?')
  .get(validatorHandler(filterSchema), listCustomers)

router.route('/:id')
  .put(validatorHandler(updateCustomerSchema), userExists, updateCustomer)

export default router
