import { Product, ProductSchema } from './product.model.js'
import { Category, CategorySchema } from './category.model.js'
import { User, UserSchema } from './user.model.js'
import { Role, RoleSchema } from './role.model.js'

const setupModels = async (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Role.init(RoleSchema, Role.config(sequelize))
}

export const modelList = {
  product: Product.modelName,
  category: Category.modelName,
  user: User.modelName,
  role: Role.modelName
}

export default setupModels
