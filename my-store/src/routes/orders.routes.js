import express from 'express'
import { listOrders, createOrder, updateOrder, deleteOrder, addProductToOrder } from '../controllers/orders.controller.js'

import validatorHandler from '../middlewares/validator.handler.js'
import { customerExists, orderExists, productExists } from '../helpers/db.validators.js'
import { filterSchema, idRequiredSchema } from '../schemas/list.schema.js'
import { createOrderSchema, updateOrderSchema, addItemSchema } from '../schemas/order.schema.js'

const router = express.Router()

router.route('/:id?')
  .get(validatorHandler(filterSchema), listOrders)

router.route('/')
  .post(validatorHandler(createOrderSchema), customerExists, createOrder)

router.route('/:id')
  .put(validatorHandler(updateOrderSchema), customerExists, updateOrder)
  .delete(validatorHandler(idRequiredSchema), deleteOrder)

router.route('/:id/add-item')
  .post(validatorHandler(addItemSchema), orderExists, productExists, addProductToOrder)

export default router
