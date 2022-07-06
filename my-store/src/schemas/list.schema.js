import Joi from 'joi'

const id = Joi.number().integer()
const from = Joi.number().integer().min(1)
const limit = Joi.number().integer().min(1)
const price = Joi.number().integer()

export const filterSchema = Joi.object({
  id,
  from,
  limit
})

export const filterProductsSchema = Joi.object({
  id,
  from,
  limit,
  price,
  price_min: price,
  price_max: price
})

export const filterOrderProductSchema = Joi.object({
  id: id.required(),
  itemId: id,
  from,
  limit
})

export const idRequiredSchema = Joi.object({
  id: id.required()
})

export const validateIdSchema = Joi.object({
  id
})
