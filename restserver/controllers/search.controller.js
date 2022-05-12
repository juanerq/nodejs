const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')

const allowedCollections = [
  'users',
  'categories',
  'products',
  'roles'
]

const searchUsers = async (term = '', res) => {
  const isMongoID = ObjectId.isValid( term )

  if(isMongoID) {
    const user = await User.findById( term )
    return res.json({
      results: (user) ? [user] : []
    })
  }

  const regex = new RegExp( term, 'i' )
  const query = {
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  }

  const [total, users ] = await Promise.all([
    User.count( query ),
    User.find( query )
  ])

  res.json({
    total,
    results: users
  })

}

const searchCategories = async (term = '', res) => {
  const isMongoID = ObjectId.isValid( term )

  if(isMongoID) {
    const category = await Category.findById( term )
    return res.json({
      results: (category) ? [category] : []
    })
  }

  const regex = new RegExp(term, 'i')
  const [total, categories ] = await Promise.all([
    Category.count({ name: regex, status: true }),
    Category.find({ name: regex, status: true })
  ])

  res.json({
    total,
    results: categories
  })

}

const searchProducts = async (term = '', res) => {
  const isMongoID = ObjectId.isValid( term )

  if(isMongoID) {
    const product = await Product.findById(term).populate('category', 'name')
    return res.json({
      results: (product) ? [product] : []
    })
  }

  const regex = new RegExp(term, 'i')
  const [total, products ] = await Promise.all([
    Product.count({ name: regex, status: true }),
    Product.find({ name: regex, status: true }).populate('category', 'name')
  ])

  res.json({
    total,
    results: products
  })

}

const search = (req, res, next) => {
  const { collection, term } = req.params

  if(!allowedCollections.includes( collection )) {
    return next({ message: `Allowed collections are: ${allowedCollections}` })
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res)
      break
    case 'categories':
      searchCategories(term, res)
      break
    case 'products':
      searchProducts(term, res)
      break

    default:
      res.status(500).json({
        message: 'I forgot to do this search'
      })
  }

}

module.exports = search