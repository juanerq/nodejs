module.exports.success = (res, msg, result, status = 200) => {
  res.status(status).json({
    msg,
    result
  })
}
