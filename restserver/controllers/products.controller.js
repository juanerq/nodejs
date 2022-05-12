const Product = require('../models/product')
const Category = require('../models/category')
const to = require('../helpers/to')

const getProducts = async (req, res) => {
    const { limit = 5, from = 0 } = req.query
    const query = { status: true }

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .skip(+from)
        .limit(+limit)
        .populate('user', 'name')
        .populate('category', 'name')
      ])

    res.status(200).json({
      total,
      products
    })
}

const getProductById = async (req, res) => {
    const { id } = req.params

    const product = await Product.findById( id )
      .populate('user', 'name')
      .populate('category', 'name')

    res.status(200).json({
      product
    })
}

const createProduct = async (req, res, next) => {
    const { status, user, ...data } = req.body

    data.name = data.name.toUpperCase()
    data.user = req.user._id

    const productDB = await Product.findOne({ name: data.name })
    if(productDB)
      return next({ message: `This product ${data.name} already exists` })

    const product = new Product( data )
    await product.save()

    res.status(201).json({
      product 
    })
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params
    const { status, user, ...data } = req.body

    if(data.name) {
      data.name = data.name.toUpperCase()
    }

    data.user = req.user._id

    const [error, product] = await to(Product.findByIdAndUpdate(id, data, { new: true }))
    if(error) return next(error)

    res.status(200).json({ 
      msg: "Updated category",
      product
  })
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    const { db = false } = req.query
    const authenticatedUser = req.user
  
    const [error, deletedProduct ] = Boolean(db) 
      ? await to(Product.findByIdAndDelete( id ))
      : await to(Product.findByIdAndUpdate( id, { status: false }, { new: true } ))
    if(error) return next(error)
  
    res.status(200).json({ 
      msg: "Product Deleted",
      deletedProduct,
      authenticatedUser
    })
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}