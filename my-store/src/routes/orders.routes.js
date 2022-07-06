import express from 'express'
import { listOrders, createOrder, updateOrder, deleteOrder, addProductToOrder, deleteProductFromOrder, listOrderProducts, updateProductFromOrder } from '../controllers/orders.controller.js'

import validatorHandler from '../middlewares/validator.handler.js'
import { customerExists, orderExists, productExists } from '../helpers/db.validators.js'
import { filterSchema, idRequiredSchema, filterOrderProductSchema } from '../schemas/list.schema.js'
import { createOrderSchema, updateOrderSchema, addItemSchema, deleteItemSchema, updateItemSchema } from '../schemas/order.schema.js'

const router = express.Router()

router.route('/:id?')
  .get(validatorHandler(filterSchema), listOrders)

router.route('/')
  .post(validatorHandler(createOrderSchema), customerExists, createOrder)

router.route('/:id')
  .put(validatorHandler(updateOrderSchema), customerExists, updateOrder)
  .delete(validatorHandler(idRequiredSchema), deleteOrder)

router.route('/:id/item')
  .post(validatorHandler(addItemSchema), orderExists, productExists, addProductToOrder)

router.route('/:id/item/:itemId?')
  .get(validatorHandler(filterOrderProductSchema), orderExists, listOrderProducts)

router.route('/:id/item/:itemId')
  .put(validatorHandler(updateItemSchema), orderExists, productExists, updateProductFromOrder)
  .delete(validatorHandler(deleteItemSchema), orderExists, deleteProductFromOrder)

export default router
