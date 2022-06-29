const Services = require('../services/Services.js')
const { modelList } = require('../models/index.js')
const Joi = require('joi')
const services = new Services()

const id = Joi.number().integer()
const name = Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(20)
const email = Joi.string().email()
const password = Joi.string().min(5)
const image = Joi.string().uri()
const roleId = Joi.number().integer()
const isBlock = Joi.boolean()

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  roleId: roleId.required(),
  image
})

const updatedUserSchema = Joi.object({
  id: id.required(),
  name,
  email,
  password,
  image,
  roleId,
  isBlock
})

const validateRole = async (req, res, next) => {
  const { roleId } = req.body
  if (!roleId) return next()

  try {
    await services.findOne(modelList.role, roleId)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUserSchema,
  updatedUserSchema,
  validateRole
}
