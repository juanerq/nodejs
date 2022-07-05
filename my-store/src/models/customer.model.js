import { Model, DataTypes, Sequelize } from 'sequelize'
import { USER_TABLE_NAME } from './user.model.js'

export const CUSTOMER_TABLE_NAME = 'customers'

export const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'customer_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(25),
    field: 'first_name',
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(25),
    field: 'last_name',
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
    unique: true,
    references: {
      model: USER_TABLE_NAME,
      key: 'user_id'
    },
    onUpdate: 'CASCADE'
  }
}

export class Customer extends Model {
  static modelName = 'Customer'
  static namesAssociations = ['user']

  static associate (models) {
    const [user] = this.namesAssociations
    this.belongsTo(models.User, { as: user })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE_NAME,
      modelName: this.modelName,
      timestamps: false
    }
  }
}
