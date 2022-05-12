const router = require('express').Router()
const { fileUpload, updateImage, showImage, updateImageCloudinay } = require('../controllers/uploads.controller')
const { validatorUpdateImage } = require('../validators/upload')
const { validateFileUpload } = require('../middlewares')

router.route('/')
  .post( validateFileUpload, fileUpload )

router.route('/:collection/:id')
  .put( validateFileUpload, validatorUpdateImage, updateImageCloudinay )
  // .get( validatorUpdateImage, showImage )

module.exports = router