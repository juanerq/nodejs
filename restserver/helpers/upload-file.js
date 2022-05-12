const path = require('path')
const { v4: uuidv4 } = require('uuid')

const uploadFile = (file, extensions = ['png','jpg','jpeg','gif'], folder = '') => {
  return new Promise((resolve, reject) => {
  
    const fileName = file.name
    const extension = fileName.split('.').pop()
  
    const validExtensions = extensions
    if( !validExtensions.includes(extension) ) {
      return reject(`This extension ${extension} is not allowed - ${validExtensions}`)
    }
  
    const newFileName = uuidv4() + '.' + extension
    const uploadPath = path.join( __dirname, '../uploads/', folder, newFileName )
  
    file.mv(uploadPath, function(err) {
      if (err) {
        return reject(err)
      }
  
      resolve(newFileName)
    })

  })
}

module.exports = {
  uploadFile
}