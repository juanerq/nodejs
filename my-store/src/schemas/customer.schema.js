import Joi from 'joi'
import { createUserSchema } from './user.schema.js'

const id = Joi.number().integer()
const name = Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(25)
const phone = Joi.string()

export const createCustomerSchema = Joi.object({
  firstName: name.required(),
  lastName: name.required(),
  phone: phone.required(),
  userId: createUserSchema
})

export const updateCustomerSchema = Joi.object({
  id: id.required(),
  userId: id,
  firstName: name,
  lastName: name,
  phone
})
