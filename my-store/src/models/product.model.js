import { Model, DataTypes, Sequelize } from 'sequelize'

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
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
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
    defaultValue: false
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

  static associations () {
    // define association here
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE_NAME,
      modelName: Product.modelName,
      timestamp: false
    }
  }
}
