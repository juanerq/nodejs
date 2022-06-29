const Joi = require('joi')

const id = Joi.number().integer()
const from = Joi.number().integer().min(1)
const limit = Joi.number().integer().min(1)

const filterSchema = Joi.object({
  id,
  from,
  limit
})

const idRequiredSchema = Joi.object({
  id: id.required()
})

const validateIdSchema = Joi.object({
  id
})

module.exports = {
  filterSchema,
  idRequiredSchema,
  validateIdSchema
}
