const { User, Product } = require('../models')

const validateCollection = async (req, res, next) => {
  const { id, collection } = req.params
  
  switch (collection) {
    case 'users':
      model = await User.findById( id )
      
      if(!model) 
        return next({ message: `There is no user with this id ${id}` })
      req.model = model

      break
    case 'products':
      model = await Product.findById( id )

      if(!model) 
        return next({ message: `There is no product with this id ${id}` })
      req.model = model
      
      break
    default:
      return res.status(500).json({
        message: 'I forgot to do this collection'
      })
  }

  next()
}

module.exports = {
  validateCollection
}