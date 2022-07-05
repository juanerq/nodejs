import { Model, DataTypes, Sequelize } from 'sequelize'
import { ROLE_TABLE_NAME } from './role.model.js'

export const USER_TABLE_NAME = 'users'

export const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'role',
    references: {
      model: ROLE_TABLE_NAME,
      key: 'role_id'
    },
    onUpdate: 'CASCADE'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255)
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
  }
}

export class User extends Model {
  static modelName = 'User'
  static namesAssociations = ['role']

  static associate (models) {
    const [role] = this.namesAssociations
    this.belongsTo(models.Role, { as: role })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: this.modelName,
      timestamps: false
    }
  }
}
