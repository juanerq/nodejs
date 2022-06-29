const boom = require('@hapi/boom')

const validatorHandler = (schema) => {
  return (req, res, next) => {
    const data = { ...req.query, ...req.body, ...req.params }
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
