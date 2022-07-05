import { Model, DataTypes, Sequelize } from 'sequelize'
import { USER_TABLE_NAME } from './user.model.js'

export const CATEGORY_TABLE_NAME = 'categories'

export const CategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    primaryKey: true,
    autoIncrement: true
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
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

export class Category extends Model {
  static modelName = 'Category'
  static namesAssociations = ['user', 'products']

  static associate (models) {
    const [user, products] = this.namesAssociations
    this.belongsTo(models.User, { as: user })
    this.hasMany(models.Product, {
      as: products,
      foreignKey: 'categoryId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE_NAME,
      modelName: this.modelName,
      timestamps: false
    }
  }
}
