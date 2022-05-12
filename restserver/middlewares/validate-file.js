const validateFileUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return next({ message: 'No files were uploaded.' })
  }

  next()

}

module.exports = {
  validateFileUpload
}