import Joi from 'joi'

const id = Joi.number().integer()
const quantity = Joi.number().integer().min(1)

export const createOrderSchema = Joi.object({
  customerId: id.required()
})

export const updateOrderSchema = Joi.object({
  id: id.required(),
  customerId: id
})

export const addItemSchema = Joi.object({
  id: id.required(),
  productId: id.required(),
  quantity: quantity.required()
})

export const updateItemSchema = Joi.object({
  id: id.required(),
  itemId: id.required(),
  quantity
})

export const deleteItemSchema = Joi.object({
  id: id.required(),
  itemId: id.required()
})
