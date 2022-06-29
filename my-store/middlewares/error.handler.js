const { ValidationError } = require('sequelize')

const logErrors = (err, req, res, next) => {
  console.error(err)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const error = {
    name: err.name,
    msg: err.message,
    stack: err.stack
  }
  res.status(500).json(error)
}

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const error = {
      name: err.name,
      msg: err.parent.sqlMessage,
      error: err.errors
    }
    res.status(409).json(error)
  }
  next(err)
}

const boomErrorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

const error404 = (req, res) => {
  const error = {
    name: 'NotFound',
    msg: 'Not Found'
  }
  res.status(404).json(error)
}

module.exports = {
  logErrors,
  errorHandler,
  ormErrorHandler,
  boomErrorHandler,
  error404
}
