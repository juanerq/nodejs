import { Model, DataTypes, Sequelize } from 'sequelize'
import { CATEGORY_TABLE_NAME } from './category.model.js'
import { USER_TABLE_NAME } from './user.model.js'

export const PRODUCT_TABLE_NAME = 'products'

export const ProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'product_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE_NAME,
      key: 'user_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE_NAME,
      key: 'category_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255)
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

export class Product extends Model {
  static modelName = 'Product'
  static namesAssociations = ['user', 'category']

  static associate (models) {
    const [user, category] = this.namesAssociations
    this.belongsTo(models.User, { as: user })
    this.belongsTo(models.Category, { as: category })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE_NAME,
      modelName: this.modelName,
      timestamp: false
    }
  }
}
