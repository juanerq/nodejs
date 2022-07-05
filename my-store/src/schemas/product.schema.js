import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(15)
const description = Joi.string().min(10)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const available = Joi.boolean()

export const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  userId: id.required(),
  categoryId: id.required()
})

export const updatedProductSchema = Joi.object({
  id: id.required(),
  categoryId: id,
  userId: id,
  name,
  available,
  description,
  price,
  image
})
