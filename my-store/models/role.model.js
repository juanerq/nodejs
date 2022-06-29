import { Model, DataTypes } from 'sequelize'

export const ROLE_TABLE_NAME = 'roles'

export const RoleSchema = {
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

export class Role extends Model {
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
