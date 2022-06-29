const { Model, DataTypes } = require('sequelize')

const ROLE_TABLE_NAME = 'roles'

const RoleSchema = {
  id: {
    type: DataTypes.INTEGER,
    field: 'role_id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}

class Role extends Model {
  static modelName = 'Role'

  static associations () {
    // define association here
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE_NAME,
      modelName: Role.modelName,
      timestamps: false
    }
  }
}

module.exports = {
  ROLE_TABLE_NAME,
  RoleSchema,
  Role
}
