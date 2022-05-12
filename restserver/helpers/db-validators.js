const { Role, User, Category, Product } = require('../models')

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if( !roleExists ) 
    throw new Error(`The role ${role} not registered in the DB`)
}

const existsEmail = async (email = '') => {
  const emailExists = await User.findOne({ email })
  if( emailExists )
    throw new Error(`The email ${email}, is already registered`)
}

const existsUserById = async (id = '') => {
  const existsUser = await User.findById(id)
  if( !existsUser ) 
    throw new Error(`Id not found ${id}`)
}

const existsCategoryById = async (id = '') => {
  const category = await Category.findById( id )
  if(!category)
    throw new Error(`Id not found ${id}`)
}

const existsCategoryName = async (name) => {
  const category = await Category.findOne({ name })
  if(category)
    throw new Error(`There is already a category with this name ${name}`)
}

const existsProductById = async (id = '') => {
  const product = await Product.findById(id)
  if(!product)
    throw new Error(`Id not found ${id}`)
}

const existsProductName = async (name = '') => {
  const product = await Product.findOne({ name })
  if(product)
    throw new Error(`There is already a category with this name ${name}`)
}

const allowedCollections = ( collection = '', allowed = [] ) => {
  if(!allowed.includes(collection)) {
    throw new Error(`This collection ${collection} is not allowed - ${allowed}`)
  }
  return true
}

module.exports = {
  isRoleValid,
  existsEmail,
  existsUserById,
  existsCategoryById,
  existsCategoryName,
  existsProductById,
  existsProductName,
  allowedCollections
}