const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const isBlock = Joi.boolean()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

const updatedProductSchema = Joi.object({
  id: id.required(),
  name,
  price,
  image,
  isBlock
})

module.exports = {
  createProductSchema,
  updatedProductSchema
}
