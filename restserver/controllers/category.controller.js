const { Category } = require('../models')
const to = require('../helpers/to')

const getCategories = async (req, res) => {

  const { limit = 5, from = 0 } = req.query
  const query = { status: true }

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(+from)
      .limit(+limit)
      .populate('user', 'name')
  ])

  res.status(200).json({
    total,
    categories
  })

}

const getCategoryById = async (req, res) => {
  const { id } = req.params

  const category = await Category.findById( id )
    .populate('user',{
      password: 0,
          __v: 0
    })

  res.status(200).json({
    category
  })

}

const createCategory = async (req, res, next) => {
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({ name })
  if(categoryDB) {
    return next({ message: `This category ${name} already exists` })
  }

  const data = {
    name,
    user: req.user._id
  }

  const category = new Category( data )
  await category.save()

  res.status(201).json({
    category
  })
}

const updateCategory = async (req, res, next) => {
  const { id } = req.params
  const { status, user, ...data } = req.body

  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const [error, category] = await to(Category.findByIdAndUpdate( id, data, { new: true } ))
  if(error) return next(error)

  res.status(200).json({ 
    msg: "Updated category",
    category
  })

}

const deleteCategory = async (req, res, next) => {
  const { id } = req.params
  const { db = false } = req.query
  const authenticatedUser = req.user

  const [error, deletedCategory ] = Boolean(db) 
    ? await to(Category.findByIdAndDelete( id ))
    : await to(Category.findByIdAndUpdate( id, { status: false }, { new: true } ))
  if(error) return next(error)

  res.status(200).json({ 
    msg: "Category Deleted",
    deletedCategory,
    authenticatedUser
  })
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}