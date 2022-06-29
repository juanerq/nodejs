import { Model, DataTypes, Sequelize } from 'sequelize'

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
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  isBlock: {
    type: DataTypes.BOOLEAN,
    field: 'is_block',
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

export class Category extends Model {
  static modelName = 'Category'

  static associations () {
    // define association here
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE_NAME,
      modelName: Category.modelName,
      timestamps: false
    }
  }
}
