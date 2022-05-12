const { uploadFile, to } = require('../helpers')
const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )

const fileUpload = async (req, res, next) => {
  const { file } = req.files

  const [error, name] = await to( uploadFile(file) )
  if(error)
    return next(error)

  res.json({
    name
  })
  
}

const updateImage = async (req, res, next) => {

  const { collection } = req.params
  const { file } = req.files
  const model = req.model 

  if(model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if( fs.existsSync(pathImg) ) {
      fs.unlinkSync( pathImg )
    }
  }

  const [error, name] = await to(uploadFile(file, undefined, collection))
  if(error)
    return next(error)

  model.img = name
  await model.save()

  res.json( model )

}

const showImage = (req, res) => {

  const { collection } = req.params
  const model = req.model
  
  if(model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if( fs.existsSync(pathImg) ) {
      return res.sendFile( pathImg )
    }
  }

  const pathNoImage = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile( pathNoImage )

}


const updateImageCloudinay = async (req, res) => {

  const model = req.model 

  if(model.img) {
    const nameArr = model.img.split('/')
    const name = nameArr.pop()
    const [ public_id ] = name.split('.')
    cloudinary.uploader.destroy( public_id )
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

  model.img = secure_url
  await model.save( secure_url )

  res.json( model )

}

module.exports = {
  fileUpload,
  updateImage,
  showImage,
  updateImageCloudinay
}