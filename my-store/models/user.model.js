const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE_NAME = 'users'

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    field: 'role_id',
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
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
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

class User extends Model {
  static modelName = 'User'

  static associations () {
    // define association here
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: User.modelName,
      timestamps: false
    }
  }
}

module.exports = {
  USER_TABLE_NAME,
  UserSchema,
  User
}
