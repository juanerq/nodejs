const { Product, ProductSchema } = require('./product.model.js')
const { Category, CategorySchema } = require('./category.model.js')
const { User, UserSchema } = require('./user.model.js')
const { Role, RoleSchema } = require('./role.model.js')

const setupModels = async (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Role.init(RoleSchema, Role.config(sequelize))
}

const modelList = {
  product: Product.modelName,
  category: Category.modelName,
  user: User.modelName,
  role: Role.modelName
}

module.exports = setupModels
module.exports.modelList = modelList
