export const errorHandler = (err, req, res, next) => {
  const error = {
    error: true,
    msg: err.message,
    stack: err.stack
  }
  res.status(500).json(error)
}

export const boomErrorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}
