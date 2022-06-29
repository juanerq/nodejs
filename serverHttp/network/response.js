exports.success = (req, res, result , status = 200) => {
  res.status(status).json({result })
}

exports.error = (err, req, res, next) => {
  console.error(err)

  const error = {
    status: 'error',
    name: err.name,
    message: err.message,
    path: err.path
  }

  if(err.name === 'CastError') {
    return res.status(500).json(error)
  }
  return res.status(400).json(error)  
}