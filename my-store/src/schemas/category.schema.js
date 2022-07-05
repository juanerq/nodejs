import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().regex(/^[a-zA-Z\s]+$/).min(5).max(25)

export const createCategorySchema = Joi.object({
  name: name.required(),
  userId: id.required()
})

export const updateCategorySchema = Joi.object({
  id: id.required(),
  name: name.required()
})
