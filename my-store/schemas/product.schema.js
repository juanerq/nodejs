import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const isBlock = Joi.boolean()

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

export const updatedProductSchema = Joi.object({
  name,
  price,
  image,
  isBlock
})

export const getProductSchema = Joi.object({
  id
})

export const idRequiredSchema = Joi.object({
  id: id.required()
})
