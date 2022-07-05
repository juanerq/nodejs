import Joi from 'joi'

const id = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(5)
const image = Joi.string().uri()
const roleId = Joi.string()
const isBlock = Joi.boolean()

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  roleId: roleId.required(),
  image
})

export const updatedUserSchema = Joi.object({
  id: id.required(),
  email,
  password,
  image,
  roleId,
  isBlock
})
