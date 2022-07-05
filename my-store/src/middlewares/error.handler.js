import { ValidationError } from 'sequelize'

export const logErrors = (err, req, res, next) => {
  console.error(err)
  next(err)
}

export const errorHandler = (err, req, res, next) => {
  const error = {
    name: err.name,
    msg: err.message,
    stack: err.stack
  }
  res.status(500).json(error)
}

export const ormErrorHandler = (err, req, res, next) => {
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

export const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

export const error404 = (req, res) => {
  const error = {
    name: 'NotFound',
    msg: 'Not Found'
  }
  res.status(404).json(error)
}
